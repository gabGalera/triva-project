import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const testScore = 3;

    if (score < testScore) {
      return (
        <>
          <Header />
          <h1>{score}</h1>
          <h1>{assertions}</h1>
          <h1 data-testid="feedback-text">Could be better...</h1>
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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
