import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from './components/Tree';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Tree rootKey="Lorem" />
      </header>
    </div>
  );
}

export default App;
