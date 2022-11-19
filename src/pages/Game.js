import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeScore, newQuestion } from '../redux/actions';
import { LogoTriviaGameDiv, BackgroundGameDiv, QuestionCategoryDiv,
  CorrectButton, QuestionTextDiv, parentClockDiv } from './GameStyle';

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
    const thousand = 1000;
    const timeLimit = 30;
    const clock = setInterval(() => {
      if (document.getElementById('clock') === null) {
        clearInterval(clock);
      } else if (document.getElementById('clock').innerHTML === timeLimit) {
        clearInterval(clock);
      } else if (document.getElementById('clock').innerHTML > 1) {
        document.getElementById('clock').innerHTML -= 1;
      } else if (document.getElementById('clock').innerHTML === '1') {
        document.getElementsByName('correct').forEach((correctAnswer) => {
          correctAnswer.disabled = true;
        });
        document.getElementsByName('incorrect').forEach((wrong) => {
          wrong.disabled = true;
        });
        // document.getElementsByName('next')[0].disabled = true;
        document.getElementById('clockParent').innerHTML = 'Acabou o tempo.';
        clearInterval(clock);
      }
    }, thousand);
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
      return dispatch(changeScore((tenNum + ((time) * 1))));
    case 'medium':
      return dispatch(changeScore((tenNum + ((time) * 2))));
    default:
      return dispatch(changeScore((tenNum + ((time) * three))));
    }
  };

  appearBtn = (time, answer) => {
    document.getElementsByName('correct').forEach((correctAnswer) => {
      correctAnswer.className = 'correctAnswerClicked';
    });
    document.getElementsByName('incorrect').forEach((wrong) => {
      wrong.className = 'wrongAnswerClicked';
    });
    // clearTimeout(entryTimer);
    this.checkScore(time, answer);
    this.setState({ shouldAppear: true });
  };

  // funçao tirada do site https://leocaseiro.com.br/shuffle-do-php-no-javascript/ para randomização
  randOrd() {
    const myNum = 0.5;
    return (Math.round(Math.random()) - myNum);
  }

  render() {
    const { questions, index, history } = this.props;
    const { shouldAppear,
      isDisabled,
      shouldShuffle } = this.state;
    let { shuffledQuestions } = this.state;
    let passingTimer = '';
    if (document.getElementById('clock')) {
      passingTimer = document.getElementById('clock').innerHTML;
    }

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
            onClick={ () => this.appearBtn(passingTimer, true) }
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
            onClick={ () => this.appearBtn(passingTimer, false) }
            disabled={ isDisabled }

          >
            {question
              .incorrect_answers[0]
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, '\'')
              .replace(/&amp;/g, '&')}
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
              onClick={ () => this.appearBtn(passingTimer, false) }
              disabled={ isDisabled }
            >
              {entry
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, '\'')
                .replace(/&amp;/g, '&')}
            </CorrectButton>
          ))
        );
        multiple.push(correct, incorrectMult);
        if (question.type === 'boolean') {
          return trueFalse.sort(this.randOrd);
        }
        return multiple.sort(this.randOrd);
      });
      this.setState({
        shouldShuffle: false,
        shuffledQuestions,
      });
    }

    return (
      <>
        <Header />
        <LogoTriviaGameDiv />
        <BackgroundGameDiv>
          {questions
          && (
            <>
              <QuestionCategoryDiv
                data-testid="question-category"
              >
                { questions[index].category }
              </QuestionCategoryDiv>
              <QuestionTextDiv
                data-testid="question-text"
              >
                <div>
                  { questions[index].question
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, '"')
                    .replace(/&amp;/g, '&')}

                </div>
              </QuestionTextDiv>
              <parentClockDiv
                id="clockParent"
              >
                Tempo:
                {' '}
                <div id="clock">
                  {30}
                </div>
                s
              </parentClockDiv>
              { questions[index].type === 'boolean'
                ? (
                  <div
                    data-testid="answer-options"
                    style={ {
                      boxSizing: 'border-box',

                      position: 'absolute',
                      width: '40.5469%', // 519 / 1280
                      height: '20.05%', // topFinal - topInicial + heightFinal + 1 = 444 - 361 + 64 + 1 = 148 => 148 / (113 + 625)
                      left: '51.64%', // 661 / 1280
                      top: '48.91%', // 361 / (113 + 625)

                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',

                      zIndex: '1',
                      background: 'transparent',
                    // border: '1px solid #FFFFFF',
                    // borderRadius: '100px',
                    } }
                  >
                    {shuffledQuestions[index].map((entry) => entry)}
                  </div>
                )
                : (
                  <div
                    data-testid="answer-options"
                    style={ {
                      boxSizing: 'border-box',

                      position: 'absolute',
                      width: '40.5469%', // 519 / 1280
                      height: '42.95%', // topFinal - topInicial + heightFinal + 1 = 480 - 228 + 64 + 1 = 317 => 317 / (113 + 625)
                      left: '51.64%', // 661 / 1280
                      top: '30.89%', // 228 / (113 + 625)

                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',

                      zIndex: '1',
                      background: 'transparent',
                      // border: '1px solid #FFFFFF',
                      // borderRadius: '100px',
                    } }
                  >
                    {shuffledQuestions[index].map((entry) => entry)}
                  </div>
                )}
            </>
          )}
        </BackgroundGameDiv>
        <footer
          style={ {
            position: 'absolute',
            width: '100%',
            height: '23.6%', // tentativa e erro

            top: '76.4%', // tentativa e erro

            background: '#3C1B7A',
          } }
        >
          { shouldAppear && (
            <button
              data-testid="btn-next"
              name="next"
              type="button"
              onClick={ () => { this.handleClickNext(); } }
              disabled={ isDisabled }
              style={ {
                position: 'absolute',
                width: '40.5468%', // 519 / 1280
                height: '27.108%', // 45 / 166
                left: '51.64%', // 661 / 1280
                top: '8.14558%', // 1 - ((575 - 45) / 577)

                background: '#2FC18C',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',

                fontFamily: 'Epilogue',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '16px',
                lineHeight: '150%',

                // display: 'flex',
                // alignItems: 'center',
                // textAlign: 'center',
                // letterSpacing: '0.12em',

                color: '#FFFFFF',

              } }
            >
              NEXT
            </button>
          )}
        </footer>
      </>
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
