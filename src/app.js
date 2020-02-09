import React from 'react';

const jeopardy = {
  200: 6,
  400: 6,
  600: 6,
  800: 6,
  1000: 6,
};

const doubleJeopardy = {
  400: 6,
  800: 6,
  1200: 6,
  1600: 6,
  2000: 6,
};

const initialState = {
  round: 1,
  activeQuestionValue: null,
  right: [],
  wrong: [],
  skipped: [],
  values: jeopardy,
};

export default class App extends React.Component {
  state = initialState

  questionButtonClick = (e, activeQuestionValue) => {
      this.setState({ activeQuestionValue });
  }

  questionAnswerClick = (e, result) => {
    if (!result) {
      this.setState({
        activeQuestionValue: null,
      });
    } else {
      this.setState({
        activeQuestionValue: null,
        values: {
          ...this.state.values,
          [this.state.activeQuestionValue]: this.state.values[this.state.activeQuestionValue] - 1,
        },
        [result]: [ parseInt(this.state.activeQuestionValue, 10), ...this.state[result]],
      });
    }

    if (
      this.state.round === 1 && 
      (this.state.right.length + this.state.wrong.length + this.state.skipped.length) === 30
    ) {
      this.setState({
        round: 2,
        values: doubleJeopardy
      });
    }
  }

  resetButtonClick = e => {
    if (window.confirm('Reset the game?')) {
      this.setState(initialState);
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>Score: {this.state.right.reduce((right, value) => right + value, 0) - this.state.wrong.reduce((wrong, value) => wrong + value, 0)}</div>
          <div>Right: {this.state.right.length}</div>
          <div>Wrong: {this.state.wrong.length}</div>
          <div>Skipped: {this.state.skipped.length}</div>
        </div>

        <div>
          {Object.keys(this.state.values).map(value => (
            <button 
              key={value}
              onClick={e => this.questionButtonClick(e, value)}
              disabled={this.state.values[value] === 0}
            >
              {value} ({(this.state.values[value])})
            </button>
          ))}
        </div>

        {this.state.activeQuestionValue && (
          <div>
            <p>For {this.state.activeQuestionValue}...</p>
            <button onClick={e => this.questionAnswerClick(e, 'right')}>Right</button>
            <button onClick={e => this.questionAnswerClick(e, 'wrong')}>Wrong</button>
            <button onClick={e => this.questionAnswerClick(e, 'skipped')}>Skip</button>
            <button onClick={this.questionAnswerClick}>X</button>
          </div>
        )}

        <div>
          <button onClick={this.resetButtonClick}>Reset</button>
        </div>
      </div>
    );
  };
}
