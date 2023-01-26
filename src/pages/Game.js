import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeScore, newQuestion } from '../redux/actions';
import { timer, randOrd } from '../helpers/gameHelpers';
import { LogoTriviaGameDiv, BackgroundGameDiv, QuestionCategoryDiv,
  CorrectButton, QuestionTextDiv, ParentClockDiv,
  AnswerOptionsTrueFalseDiv,
  AnswerOptionsMultipleDiv,
  GameFooter, NextButton, QuestionDiv } from './StyledComponents/GameStyle';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldAppear: false,
      isDisabled: false,
      questionsNumber: 0,
      shouldShuffle: true,
      shuffledQuestions: [],
    };
  }

  componentDidMount() {
    timer();
  }

  handleClickNext = () => {
    const { dispatch, history, score } = this.props;
    const { questionsNumber } = this.state;
    const maxQuestion = 4;
    document.getElementsByName('correct').forEach((correctAnswer) => {
      correctAnswer.className = 'notClickedAnswer';
    });
    document.getElementsByName('incorrect').forEach((wrong) => {
      wrong.className = 'notClickedAnswer';
    });
    this.setState((oldState) => ({
      shouldAppear: false,
      questionsNumber: oldState.questionsNumber + 1,
    }));
    document.getElementById('clock').innerHTML = 30;
    if (questionsNumber >= maxQuestion) {
      const ranking = localStorage.getItem('ranking');
      const rankingObj = JSON.parse(ranking);
      rankingObj[rankingObj.length - 1] = {
        name: rankingObj[rankingObj.length - 1].name,
        picture: rankingObj[rankingObj.length - 1].picture,
        score };
      const sortedRanking = rankingObj.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(sortedRanking));
      return history.push('/feedback');
    }
    return dispatch(newQuestion());
  };

  checkScore = (time, answer) => {
    const { questions, index, dispatch } = this.props;
    const difficult = questions[index].difficulty;
    const tenNum = 10;
    const three = 3;
    if (answer === false) {
      return dispatch(changeScore(0));
    }
    switch (difficult) {
    case 'easy':
      return dispatch(changeScore((tenNum + ((Number(time)) * 1))));
    case 'medium':
      return dispatch(changeScore((tenNum + ((Number(time)) * 2))));
    default:
      return dispatch(changeScore((tenNum + (Number((time)) * three))));
    }
  };

  appearBtn = (answer) => {
    document.getElementsByName('correct').forEach((correctAnswer) => {
      correctAnswer.className = 'correctAnswerClicked';
    });
    document.getElementsByName('incorrect').forEach((wrong) => {
      wrong.className = 'wrongAnswerClicked';
    });
    this.checkScore(document.getElementById('clock').innerHTML, answer);
    this.setState({ shouldAppear: true });
  };

  render() {
    const { questions, index, history } = this.props;
    const { shouldAppear,
      isDisabled,
      shouldShuffle } = this.state;
    let { shuffledQuestions } = this.state;
    if (questions.length === 0) {
      localStorage.clear();
      return history.push('/');
    }
    if (shouldShuffle) {
      shuffledQuestions = questions.map((question) => {
        const multiple = [];
        const trueFalse = [];
        const correct = (
          <CorrectButton
            type="button"
            data-testid="correct-answer"
            name="correct"
            className="notClickedAnswer"
            onClick={ () => this.appearBtn(true) }
            disabled={ isDisabled }
          >
            {question.correct_answer}
          </CorrectButton>
        );
        const incorrect = (
          <CorrectButton
            type="button"
            name="incorrect"
            data-testid={ `wrong-answer-${index}` }
            className="notClickedAnswer"
            onClick={ () => this.appearBtn(false) }
            disabled={ isDisabled }
          >
            {question.incorrect_answers[0].replace(/&quot;/g, '"').replace(/&#039;/g, '\'').replace(/&amp;/g, '&')}
          </CorrectButton>
        );
        trueFalse.push(correct, incorrect);
        const incorrectMult = (
          question.incorrect_answers.map((entry) => (
            <CorrectButton
              type="button"
              name="incorrect"
              key={ entry }
              data-testid={ `wrong-answer-${index}` }
              className="notClickedAnswer"
              onClick={ () => this.appearBtn(false) }
              disabled={ isDisabled }
            >
              {entry.replace(/&quot;/g, '"').replace(/&#039;/g, '\'').replace(/&amp;/g, '&')}
            </CorrectButton>
          ))
        );
        multiple.push(correct, incorrectMult);
        if (question.type === 'boolean') {
          return trueFalse.sort(randOrd);
        }
        return multiple.sort(randOrd);
      });
      this.setState({
        shouldShuffle: false,
        shuffledQuestions,
      });
    }
    return (
      <div
        style={ {
          display: 'flex',
        } }
      >
        <Header />
        <BackgroundGameDiv>
          {questions
          && (
            <>
              <QuestionDiv>
                <LogoTriviaGameDiv />
                <QuestionCategoryDiv
                  data-testid="question-category"
                >
                  { questions[index].category }
                </QuestionCategoryDiv>
                <QuestionTextDiv
                  data-testid="question-text"
                >
                  <div style={ { padding: '5%' } }>
                    { questions[index].question.replace(/&quot;/g, '"').replace(/&#039;/g, '\'').replace(/&amp;/g, '&')}
                  </div>
                  <ParentClockDiv
                    id="clockParent"
                  >
                    Tempo:
                    {' '}
                    <div id="clock">
                      {30}
                    </div>
                    s
                  </ParentClockDiv>
                </QuestionTextDiv>
              </QuestionDiv>
              { questions[index].type === 'boolean'
                ? (
                  <AnswerOptionsTrueFalseDiv
                    data-testid="answer-options"
                  >
                    {shuffledQuestions[index].map((entry) => entry)}
                  </AnswerOptionsTrueFalseDiv>
                )
                : (
                  <AnswerOptionsMultipleDiv
                    data-testid="answer-options"
                  >
                    {shuffledQuestions[index].map((entry) => entry)}
                  </AnswerOptionsMultipleDiv>
                )}
            </>
          )}
        </BackgroundGameDiv>
        <GameFooter>
          { shouldAppear && (
            <NextButton
              data-testid="btn-next"
              name="next"
              type="button"
              onClick={ () => { this.handleClickNext(); } }
              disabled={ isDisabled }
            >
              NEXT
            </NextButton>
          )}
        </GameFooter>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.player.questions,
  assertions: state.player.assertions,
  token: state.player.token,
  index: state.player.index,
  score: state.player.score,
});
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Game);
