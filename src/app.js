import React from 'react';
import styled from 'styled-components';

const Game = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px 0;
`;

const Scoreboard = styled.div`
  display: flex;
  align-items: stretch;
  padding: 0 20px;
`;

const ScoreItem = styled.div`
  flex-grow: 1;
`;

const QuestionBank = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const AnswerModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const AnswerModalInner = styled.div`
  max-width: 300px;
  margin: 2em auto;
  background: white;
  box-shadow: 0 0 5px 0 rgba(50, 50, 50, 0.75);
  padding: 1em;
`;

const AnswerButton = styled.button`
  background: blue;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  height: 100px;
  width: 100%;
  border: 1px solid white;
  outline: none;
  cursor: pointer;

  &:active {
    background: lightblue;
  }
`;

const AnswerModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const AnswerModalLabel = styled.p`
  flex-grow: 1;
  margin: 0;
  font-weight: bold;
  font-size: 20px;
  color: blue;
`;

const ClearButton = styled.button`
  border: 1px solid red;
  border-radius: 4px;
  color: red;
  height: 40px;
  width: 40px;
  cursor: pointer;
  background: none;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  width: 100%;
  height: 40px;
  display: flex;
`;

const FooterButton = styled.button`
  border-style: solid;
  border-color: #bbb;
  border-width: 1px 1px 1px 0;
  background: #ddd;
  color: #555;
  height: 100%;
  flex-grow: 1;
  min-width: 50%;
  box-style: border-box;
  cursor: pointer;

  &:first-child {
    border-left-width: 1px;
  }

  &:hover {
    background: #ccc;
  }

  &:disabled {
    color: #bbb;
    background: #eee;
    cursor: not-allowed;
  }
`;

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
  }

  resetButtonClick = e => {
    if (window.confirm('Reset the game?')) {
      this.setState(initialState);
    }
  }

  onNextRoundClick = e => {
    this.setState({
      round: 2,
      values: doubleJeopardy,
    });
  }

  render() {
    return (
      <Game>
        <Scoreboard>
          <ScoreItem>Score: {this.state.right.reduce((right, value) => right + value, 0) - this.state.wrong.reduce((wrong, value) => wrong + value, 0)}</ScoreItem>
          <ScoreItem>Right: {this.state.right.length}</ScoreItem>
          <ScoreItem>Wrong: {this.state.wrong.length}</ScoreItem>
          <ScoreItem>Skipped: {this.state.skipped.length}</ScoreItem>
        </Scoreboard>

        <QuestionBank>
          {Object.keys(this.state.values).map(value => (
            <AnswerButton 
              key={value}
              onClick={e => this.questionButtonClick(e, value)}
              disabled={this.state.values[value] === 0}
            >
              {value} ({(this.state.values[value])})
            </AnswerButton>
          ))}
        </QuestionBank>

        {this.state.activeQuestionValue && (
          <AnswerModal>
            <AnswerModalInner>
              <AnswerModalHeader>
                <AnswerModalLabel>For {this.state.activeQuestionValue}...</AnswerModalLabel>
                <ClearButton onClick={this.questionAnswerClick}>X</ClearButton>
              </AnswerModalHeader>
              <AnswerButton onClick={e => this.questionAnswerClick(e, 'right')}>Right</AnswerButton>
              <AnswerButton onClick={e => this.questionAnswerClick(e, 'wrong')}>Wrong</AnswerButton>
              <AnswerButton onClick={e => this.questionAnswerClick(e, 'skipped')}>Skip</AnswerButton>
            </AnswerModalInner>
          </AnswerModal>
        )}

        <Footer>
          <FooterButton onClick={this.resetButtonClick}>RESET</FooterButton>
          {this.state.round === 1 && (
            <FooterButton
              disabled={
                (this.state.right.length + this.state.wrong.length + this.state.skipped.length) < 30
              }
              onClick={this.onNextRoundClick}
            >
              NEXT ROUND
            </FooterButton>
          )}
        </Footer>
      </Game>
    );
  };
}
