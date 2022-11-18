import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    // const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { assertions, score,
      // history,
    } = this.props;
    const testScore = 3;

    if (assertions < testScore) {
      return (
        <>
          <Header />
          <h1 data-testid="feedback-total-score">{score}</h1>
          <h1 data-testid="feedback-total-question">
            {
              assertions
            }

          </h1>
          <h1 data-testid="feedback-text">Could be better...</h1>
          {/* <button
            data-testid="btn-play-again"
            type="button"
            onClick={ history.push('/') }
          >
            Play Again
          </button> */}
          <Link
            to="/ranking"
          >
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </Link>
          <Link
            to="/"
          >
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Play Again
            </button>
          </Link>
        </>
      );
    }

    if (assertions >= testScore) {
      return (
        <>
          <Header />
          <h1 data-testid="feedback-total-score">{score}</h1>
          <h1 data-testid="feedback-total-question">
            {
              assertions
            }

          </h1>
          <h1 data-testid="feedback-text">Well Done!</h1>
          {/* <button
            data-testid="btn-play-again"
            type="button"
            onClick={ history.push('/') }
          >
            Play Again
          </button> */}
          <Link
            to="/ranking"
          >
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </Link>
          <Link
            to="/"
          >
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Play Again
            </button>
          </Link>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
