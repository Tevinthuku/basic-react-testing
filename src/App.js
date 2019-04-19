import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counter: 0
  };

  handleAddCounter = event => {
    this.setState(state => ({
      counter: state.counter + 1
    }));
  };
  render() {
    const { counter } = this.state;
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {counter}</h1>
        <button onClick={this.handleAddCounter} data-test="increment-button">
          Increment
        </button>
      </div>
    );
  }
}

export default App;
