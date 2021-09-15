import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import '../styles/characters.css'
class Characters extends Component {

    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this)
        this.shuffle = this.shuffle.bind(this)
    }


    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }



    onClick(event, index) {
        event.preventDefault()
        let people = this.state.people
        console.log(`person clicked: ${people[index].name}`);
        if (people[index].clicked === false) {
            people[index].clicked = true;

            this.setState({ people })
            this.setState({ score: this.state.score + 1 }, () => {
                console.log(`score is currently: ${this.state.score}`);

            })

        } else {
            this.setState({
                highScore: this.state.score,
                score: 0,
            }, () => {
                console.log(`score is currently: ${this.state.score}`);
                console.log(`highScore is currently: ${this.state.highScore}`);
            })
            people.forEach(person => {
                person.clicked = false
            })
            this.setState({ people })
        }
        this.shuffle(people)
        console.log(this.state.people);
    }





    state = {
        loading: true,
        people: null,
        score: 0,
        highScore: 0,

    }
    async componentDidMount() {
        const response = await fetch("https://www.breakingbadapi.com/api/character/random?limit=12")
        const data = await response.json()
        data.clicked = false;
        data.forEach(element => {
            element.clicked = false;


        });
        this.setState({ loading: false, people: data })
        console.log(this.state);

    }


    render() {
        return (
          <div>
            {
              <div className="scoreboard-container">
                <Scoreboard
                  score={this.state.score}
                  highScore={this.state.highScore}
                />
              </div>
            }
            {this.state.loading && (
              <div>
                <p>loading...</p>
              </div>
            )}
            {
              <div className='cards'>
                {" "}
                {!this.state.loading &&
                  this.state.people.map((person, index) => (
                    <div className="card" key={person.char_id}>
                      <h3>{person.name}</h3>
                      <img
                        src={person.img}
                        alt={person.name}
                        height="300"
                        width="300"
                        onClick={(event) => this.onClick(event, index)}
                      />
                    </div>
                  ))}
              </div>
            }
          </div>
        );
    }
}

export default Characters;

