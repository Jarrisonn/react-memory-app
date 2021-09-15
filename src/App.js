import React from 'react';
import './styles/App.css';
import Characters from './components/Characters';
function App() {
  return (
    <div className="App">
      <h1 className='title'>Breaking Bad Memory Game</h1>
      <Characters/>
    </div>
  );
}

export default App;
