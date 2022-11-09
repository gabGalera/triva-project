import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionsAPI } from '../redux/actions';

class GameOn extends React.Component {
  componentDidMount() {
    this.callAPI();
  }

  callAPI = () => {
    const { dispatch, token } = this.props;
    dispatch(questionsAPI(token));
  };

  render() {
    const { questions } = this.props;
    console.log(questions);
    // const isBool = firstQuest.type === 'boolean';

    return (
      <div>
        {questions
          && (
            <>
              <h1>Trybe</h1>
              <h2>Score: 0</h2>
              <h3 data-testid="category">
                { questions[0].category }
              </h3>
              <p data-testid="question-text">
                { questions[0].question }
              </p>
              {/* { firstQuest.type === 'boolean'
                ? (
                  <div>
                    <button
                      type="button"
                    >
                      {firstQuest.correct_answer}
                    </button>
                    <button
                      type="button"
                    >
                      {firstQuest.incorrect_answers[0]}
                    </button>
                  </div>
                )
                : <p>OI</p>} */}
            </>
          )}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.questions,
  token: state.player.token,
});

GameOn.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(GameOn);
