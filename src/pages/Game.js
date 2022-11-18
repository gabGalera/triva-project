import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeScore, newQuestion, zeroScore } from '../redux/actions';
// import background from '../images/background.png';

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

  componentDidMount() {
    const thousand = 1000;
    const clock = setInterval(() => {
      if (document.getElementById('clock') === null) {
        clearInterval(clock);
      } else if (document.getElementById('clock').innerHTML > 1) {
        document.getElementById('clock').innerHTML -= 1;
      } else if (document.getElementById('clock').innerHTML === 1) {
        document.getElementById('clock').innerHTML = 'Acabou o tempo.';
        clearInterval(clock);
      }
    }, thousand);
  }

  handleClickNext = () => {
    const { dispatch, history, score } = this.props;
    const { questionsNumber } = this.state;
    const maxQuestion = 4;
    this.setState((oldState) => ({
      shouldAppear: false,
      clicked: false,
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
      dispatch(zeroScore());
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
      return dispatch(changeScore((tenNum + ((time) * 1))));
    case 'medium':
      return dispatch(changeScore((tenNum + ((time) * 2))));
    default:
      return dispatch(changeScore((tenNum + ((time) * three))));
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
    let passingTimer = '';
    if (document.getElementById('clock')) {
      passingTimer = document.getElementById('clock').innerHTML;
      console.log(passingTimer);
    }
    const timerFunc = setTimeout(() => {
      this.setState({
        isDisabled: true,
      });
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
        onClick={ () => this.appearBtn(timerFunc, passingTimer, true) }
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
        onClick={ () => this.setState({ shouldAppear: true, clicked: true }) }
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
          onClick={ () => this.appearBtn(timerFunc, passingTimer, false) }
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
      <>
        <Header />
        <div
          style={ {
            position: 'absolute',
            width: '1280px',
            height: '625px',
            left: '0px',
            top: '85px',

          } }
        >
          {questions
          && (
            <>
              <h1>Trybe</h1>
              <h2>Score: 0</h2>
              <h2 id="clock">
                {30}

              </h2>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.questions,
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
