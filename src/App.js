import React, { Component } from 'react';

import './App.css';
import ApiFun from './ApiFun/ApiFun';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: null,
      displayValue: '0',
      operator: null,
      // prevValue: '',
      // nextValue: '',
      waitingForOperand: false,
      // valueArray: [],
      value: null,
      finalDisplayBool: false,
      operationDisplay: '',
    };
  }

  inputDigit = digit => {
    const { displayValue, waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
        operationDisplay: this.state.operationDisplay + String(digit),
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
        operationDisplay:
          this.state.operationDisplay === '0' ? String(digit) : this.state.operationDisplay + digit,
      });
    }
  };

  inputDot = () => {
    if (this.state.waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false,
      });
    }
    if (this.state.displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: this.state.displayValue + '.',
        waitingForOperand: false,
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      finalDisplayBool: false,
      operationDisplay: '',
    });
  };

  toggleSign = () => {
    if (this.state.displayValue === this.state.displayValue * -1) {
      this.setState({
        displayValue: this.state.displayValue * -1,
        // operationDisplay: String(parseFloat(this.state.operationDisplay) * -1),
      });
    } else {
      this.setState({
        displayValue: this.state.displayValue * -1,
        // operationDisplay: String(parseFloat(this.state.operationDisplay) * -1),
      });
    }
  };

  inputPercent = () => {
    const value = parseFloat(this.state.displayValue);
    this.setState({
      displayValue: String(value / 100),
    });
  };

  processOperation = nextValue => {
    const currentValue = this.state.value;
    //might need || 0
    let compVal;
    this.setState({});

    if (this.state.operator === '+') {
      let finalResult = parseFloat(nextValue) + parseFloat(currentValue);
      compVal = finalResult;
      // parseFloat(nextValue);
      console.log('compval', finalResult);

      return compVal;
    } else if (this.state.operator === '-') {
      let finalResult = parseFloat(currentValue) - parseFloat(nextValue);

      compVal = finalResult;
      return compVal;
    } else if (this.state.operator === '*') {
      let finalResult = parseFloat(nextValue) * parseFloat(currentValue);

      compVal = finalResult;
      return compVal;
    } else if (this.state.operator === '/') {
      let finalResult = parseFloat(currentValue) / parseFloat(nextValue);

      compVal = finalResult;
      return compVal;
    } else {
      compVal = parseFloat(nextValue);
    }

    return compVal;
  };

  performOperation = nextOperator => {
    if (this.state.operator === '=') {
      this.setState({
        operationDisplay: this.state.displayValue,
      });
    }
    const nextValue = parseFloat(this.state.displayValue);

    if (this.state.value == null) {
      //no previous value, and they hit an operator key
      this.setState({
        value: nextValue,
      });
    } else if (this.state.operator) {
      // const currentValue = this.state.value || 0;

      const computedValue = this.processOperation(nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue),
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
      operationDisplay: this.state.displayValue + nextOperator,
      finalDisplayBool: nextOperator === '=' ? true : false,
    });
  };

  render() {
    return (
      <div className="App">
        <h3 id={'numberDisplay'}>
          {this.state.finalDisplayBool === true ? this.state.displayValue : this.state.operationDisplay}
        </h3>
        <div className={'operations'}>
          <button onClick={() => this.clearDisplay()}>AC</button>
          <button onClick={() => this.inputPercent()}>%</button>
          <button onClick={() => this.toggleSign()}>±</button>
        </div>
        <div className="numberFields">
          <button onClick={() => this.inputDigit(0)}>0</button>
          <button onClick={() => this.inputDot()}>.</button>
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.inputDigit(3)}>3</button>
          <button onClick={() => this.inputDigit(4)}>4</button>
          <button onClick={() => this.inputDigit(5)}>5</button>
          <button onClick={() => this.inputDigit(6)}>6</button>
          <button onClick={() => this.inputDigit(7)}>7</button>
          <button onClick={() => this.inputDigit(8)}>8</button>
          <button onClick={() => this.inputDigit(9)}>9</button>
        </div>
        <div className="operations">
          <button onClick={() => this.performOperation('/')}>÷</button>
          <button onClick={() => this.performOperation('*')}>x</button>
          <button onClick={() => this.performOperation('-')}>-</button>
          <button onClick={() => this.performOperation('+')}>+</button>
          <button onClick={() => this.performOperation('=')}>=</button>
        </div>
        {/* <ApiFun /> */}
      </div>
    );
  }
}

export default App;
