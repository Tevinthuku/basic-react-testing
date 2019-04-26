import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counter: 0,
    error: null
  };

  handleAddCounter = event => {
    this.setState(state => ({
      counter: state.counter + 1,
      error: null
    }));
  };

  handleDecrement = event => {
    this.setState(({ counter, error }) => ({
      counter: counter === 0 ? 0 : counter - 1,
      error: counter === 0 ? true : null
    }));
  };
  render() {
    const { counter, error } = this.state;
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          {!error
            ? `The counter is currently ${counter}`
            : `Cannot go lower than zero`}
        </h1>
        <button onClick={this.handleAddCounter} data-test="increment-button">
          Increment
        </button>
        <button onClick={this.handleDecrement} data-test="decrement-button">
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
