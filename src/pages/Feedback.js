import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, assertions, history } = this.props;
    const testScore = 3;

    if (score < testScore) {
      return (
        <>
          <Header />
          <h1>{score}</h1>
          <h1>{assertions}</h1>
          <h1 data-testid="feedback-text">Could be better...</h1>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ history.push('/') }
          >
            Play Again
          </button>
        </>
      );
    }

    if (score >= testScore) {
      return (
        <>
          <Header />
          <h1>{score}</h1>
          <h1>{assertions}</h1>
          <h1 data-testid="feedback-text">Well Done!</h1>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ history.push('/') }
          >
            Play Again
          </button>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
