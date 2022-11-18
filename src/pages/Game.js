/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeScore, newQuestion, zeroScore } from '../redux/actions';
import trivia from '../images/trivia.png';
import background from '../images/background.png';

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
            width: '15.3976%', // 197.09 / 1280
            height: '26.8536%', // 198.18 / (113 + 625)
            left: '16.7968%', // 215 / 1280
            top: '3.523%', // 26 / (113 + 625)
            backgroundImage: `url(${trivia})`,
            backgroundSize: '100% 100%',
            // backgroundRepeat: 'no-repeat',

            zIndex: '1',
          } }
        />
        <div
          style={ {
            position: 'absolute',
            width: '100%',
            height: '84.688%', // 625 / (113 + 625)
            left: '0px',
            top: '11.517%', // 85 / (113 + 625)

            backgroundImage: `url(${background})`,
            backgroundSize: 'contain',
            // color: whi,
            // zIndex: 1,
          } }
        >
          {questions
          && (
            <>
              <div
                data-testid="question-category"
                style={ {
                  position: 'absolute',
                  width: '32.2656%', // 413 / 1280
                  height: '6.0975%', // 45 / (113 + 625)
                  left: '8.9%', // 114 / 1280
                  top: '37.2629%', // 275 / (113 + 625)

                  background: '#F9BA18',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '100px',

                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',

                  letterSpacing: '0.12em',

                  zIndex: '2',
                  color: '#FFFFFF',
                } }
              >
                { questions[index].category.toUpperCase() }
              </div>
              <div
                data-testid="question-text"
                style={ {
                  position: 'absolute',
                  width: '34.2968%', // 439 / 1280
                  height: '38.75%', // 286 / (113 + 625)
                  left: '7.89%', // 101 / 1280
                  top: '40.65%', // 300 / (113 + 625)

                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',

                  fontFamily: 'Epilogue',
                  fonStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px', // 16 /
                  lineHeight: '150%',
                  /* or 24px */

                  color: '#000000',

                  background: '#FFFFFF',
                  zIndex: '1',
                  boxShadow: '1px 4px 13px 2px rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px',
                } }
              >
                <div>
                  { questions[index].question }
                </div>
              </div>
              <div
                style={ {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  width: '32.26%', // 413 / 1280
                  height: '5.15%', // 38 / (113 + 625)
                  left: '8.9%', // 114 / 1280
                  top: '73.85%',
                  zIndex: '6',
                  // background: 'red',
                } }
              >
                Tempo:
                {' '}
                <div id="clock">
                  {30}
                </div>
                s
              </div>
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
            </>
          )}
        </div>
        <footer
          style={ {
            position: 'absolute',
            width: '100%',
            height: '26.56%', // 166 / (625)
            left: '0px',
            top: '73.4%', // tentativa e erro

            background: '#3C1B7A',
          } }
        >
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
        </footer>
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
