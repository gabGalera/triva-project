import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { zeroScore } from '../redux/actions';

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
          <div
            style={ {
              position: 'absolute',
              zIndex: '5',
            } }
          >
            <h1 data-testid="feedback-total-score">
              {
                score
              }

            </h1>
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
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
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
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
              >
                Play Again
              </button>
            </Link>
          </div>
        </>
      );
    }

    if (assertions >= testScore) {
      return (
        <>
          <Header />
          <div
            style={ {
              position: 'absolute',
              // top: '17.546%',
              zIndex: '5',
            } }
          >
            <h1 data-testid="feedback-total-score">
              {
                score
              }

            </h1>
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
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
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
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
              >
                Play Again
              </button>
            </Link>
          </div>
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
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
