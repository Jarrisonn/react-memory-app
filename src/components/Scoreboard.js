import React from 'react';
import '../styles/scoreboard.css'
const Scoreboard = (props) => {
    return (
        <div className='scoreboard'>
            <h2>Score: {props.score}</h2>
            <h2>HighScore: {props.highScore}</h2>
        </div>
    );
}

export default Scoreboard;
