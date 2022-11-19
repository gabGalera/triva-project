import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { zeroScore } from '../redux/actions';
import { BackgroundDiv, FeedbackFooter, GravatarImg, InfosDiv,
  LogoTriviaFeedbackDiv,
  PlayAgain,
  RankingButton } from './StyledComponents/FeedbackStyled';

class Feedback extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { assertions, score, name } = this.props;
    const testScore = 3;

    if (assertions < testScore) {
      return (
        <>
          <BackgroundDiv>
            <Header />
            <LogoTriviaFeedbackDiv />
            <GravatarImg
              src={ ranking.find((entry) => entry.name === name).picture }
              alt={ name }
            />
            <InfosDiv>
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
            </InfosDiv>
            <Link
              to="/ranking"
            >
              <RankingButton
                data-testid="btn-ranking"
                type="button"
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
              >
                Ranking
              </RankingButton>
            </Link>
            <Link
              to="/"
            >
              <PlayAgain
                data-testid="btn-play-again"
                type="button"
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
              >
                Play Again
              </PlayAgain>
            </Link>
          </BackgroundDiv>
          <FeedbackFooter />
        </>
      );
    }

    if (assertions >= testScore) {
      return (
        <>
          <BackgroundDiv>
            <Header />
            <LogoTriviaFeedbackDiv />
            <GravatarImg
              src={ ranking.find((entry) => entry.name === name).picture }
              alt={ name }
            />
            <InfosDiv>
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
            </InfosDiv>
            <Link
              to="/ranking"
            >
              <RankingButton
                data-testid="btn-ranking"
                type="button"
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
              >
                Ranking
              </RankingButton>
            </Link>
            <Link
              to="/"
            >
              <PlayAgain
                data-testid="btn-play-again"
                type="button"
                onClick={ () => {
                  const { dispatch } = this.props;
                  dispatch(zeroScore());
                } }
              >
                Play Again
              </PlayAgain>
            </Link>
          </BackgroundDiv>
          <FeedbackFooter />
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
});

Feedback.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
