import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeScore, newQuestion } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      shouldAppear: false,
      isDisabled: false,
      timer: 30000,
      questionsNumber: 0,
    };
  }

  // componentDidMount = () => {
  //   this.intervalCount();
  // }

  handleClickNext = () => {
    const { dispatch, history } = this.props;
    const { questionsNumber } = this.state;
    const maxQuestion = 4;
    this.setState((oldState) => ({
      shouldAppear: false,
      clicked: false,
      questionsNumber: oldState.questionsNumber + 1,
    }));
    if (questionsNumber >= maxQuestion) {
      return history.push('/feedback');
    }
    return dispatch(newQuestion());
  };

  // myTime = () => {
  //   const { dispatch } = this.props;
  //   dispatch(changeTime(1));
  // }

  // intervalCount = () => {
  //   setInterval(this.myTime(), 1000);
  // }

  checkScore = (time, answer) => {
    const { questions, index, dispatch } = this.props;
    const difficult = questions[index].difficulty;
    const tenNum = 10;
    const thousand = 1000;
    const three = 3;

    if (answer === false) {
      return dispatch(changeScore(0));
    }
    switch (difficult) {
    case 'easy':
      return dispatch(changeScore((tenNum + ((time / thousand) * 1))));
    case 'medium':
      return dispatch(changeScore((tenNum + ((time / thousand) * 2))));
    case 'hard':
      return dispatch(changeScore((tenNum + ((time / thousand) * three))));
    default:
      return null;
    }
  };

  appearBtn = (entryTimer, time, answer) => {
    clearTimeout(entryTimer);
    this.checkScore(time, answer);
    this.setState({ shouldAppear: true, clicked: true });
  };

  // funçao tirada do site https://leocaseiro.com.br/shuffle-do-php-no-javascript/ para randomização
  randOrd() {
    const myNum = 0.5;
    return (Math.round(Math.random()) - myNum);
  }

  render() {
    const { questions, index, history } = this.props;
    const { shouldAppear, isDisabled, timer, clicked } = this.state;
    let timer2 = timer;

    const timerFunc = setTimeout(() => {
      const thousand = 1000;
      this.setState({
        isDisabled: true,
      });
      setInterval(() => {
        timer2 -= thousand;
      }, thousand);
    }, timer);

    if (questions.length === 0) {
      localStorage.clear();
      return history.push('/');
    }

    const trueFalse = [];
    const correct = (
      <button
        type="button"
        data-testid="correct-answer"
        className={ clicked ? 'correctAnswerClicked' : 'notClickedAnswer' }
        //      onClick={ this.handleClick }
        onClick={ () => this.appearBtn(timerFunc, timer2, true) }
        disabled={ isDisabled }
      >
        {questions[index].correct_answer}
      </button>
    );
    const incorrect = (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        className={ clicked ? 'wrongAnswerClicked' : 'notClickedAnswer' }
        //      onClick={ this.handleClick }
        onClick={ () => this.appearBtn(timerFunc, timer2, false) }
        disabled={ isDisabled }
      >
        {questions[index].incorrect_answers[0]}
      </button>
    );
    trueFalse.push(correct, incorrect);
    const multiple = [];
    const incorrectMult = (
      questions[index].incorrect_answers.map((element) => (
        <button
          type="button"
          key={ element }
          data-testid={ `wrong-answer-${index}` }
          className={ clicked ? 'wrongAnswerClicked' : 'notClickedAnswer' }
          //        onClick={ this.handleClick }
          onClick={ () => this.appearBtn(timerFunc, timer2, false) }
          disabled={ isDisabled }
        >
          {element}
        </button>
      ))
    );
    multiple.push(correct, incorrectMult);
    multiple.sort(this.randOrd);
    trueFalse.sort(this.randOrd);

    return (
      <div>
        {questions
          && (
            <>
              <Header />
              <h1>Trybe</h1>
              <h2>Score: 0</h2>
              <h3 data-testid="question-category">
                { questions[index].category }
              </h3>
              <p data-testid="question-text">
                { questions[index].question }
              </p>
              { questions[index].type === 'boolean'
                ? (
                  <div data-testid="answer-options">
                    {trueFalse.map((element) => element)}
                  </div>
                )
                : (
                  <div data-testid="answer-options">
                    {multiple.map((element) => element)}
                  </div>
                )}
              { shouldAppear && (
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ () => { this.handleClickNext(); } }
                  disabled={ isDisabled }
                >
                  Next
                </button>
              )}
            </>
          )}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.questions,
  token: state.player.token,
  index: state.player.index,
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
};

export default connect(mapStateToProps)(Game);
