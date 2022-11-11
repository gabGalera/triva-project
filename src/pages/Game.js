import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { newQuestion } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldAppear: false,
      isDisabled: false,
      timer: 30000,
    };
  }

  // componentDidUpdate() {
  //   this.setState({
  //     shouldAppear: false,
  //   });
  // }

  // componentDidUpdate() {
  //   this.appearBtn();
  // }

  handleClick = () => {
    const { dispatch } = this.props;
    this.setState({ shouldAppear: false });
    // this.appearBtn();
    dispatch(newQuestion());
  };

  appearBtn = (entryTimer) => {
    // const seconds = 5000;
    // setTimeout(() => {
    clearTimeout(entryTimer);
    this.setState({ shouldAppear: true });
    // }, seconds);
  };

  // funçao tirada do site https://leocaseiro.com.br/shuffle-do-php-no-javascript/ para randomização
  randOrd() {
    const myNum = 0.5;
    return (Math.round(Math.random()) - myNum);
  }

  render() {
    const { questions, index, history } = this.props;
    const { shouldAppear, isDisabled, timer } = this.state;

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
        onClick={ () => this.appearBtn(timerFunc) }
        disabled={ isDisabled }
      >
        {questions[index].correct_answer}
      </button>
    );
    const incorrect = (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        onClick={ () => this.appearBtn(timerFunc) }
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
          onClick={ () => this.appearBtn(timerFunc) }
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
                  onClick={ this.handleClick }
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
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
