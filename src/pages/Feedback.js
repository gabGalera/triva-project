import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { zeroScore } from '../redux/actions';
import { AssertionsMessage, BackgroundDiv, FeedbackFooter,
  FeedbackMessage, GravatarImg, InfosDiv,
  PlayAgain,
  RankingButton,
  ScoreMessage,
  LogoTriviaFeedbackDiv,
  DivButtons } from './StyledComponents/FeedbackStyled';

class Feedback extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { assertions, score, name } = this.props;
    const testScore = 3;

    if (assertions < testScore) {
      return (
        <BackgroundDiv>
          <Header />
          <LogoTriviaFeedbackDiv />
          <GravatarImg
            src={ ranking.find((entry) => entry.name === name).picture }
            alt={ name }
          />
          <InfosDiv>
            <FeedbackMessage
              data-testid="feedback-text"
            >
              Could be better...
            </FeedbackMessage>
            <AssertionsMessage>
              Você acertou
              {' '}
              <span style={ { padding: '4px' } } data-testid="feedback-total-question">
                {
                  assertions
                }
              </span>
              {' '}
              questões!
            </AssertionsMessage>
            <ScoreMessage>
              Um total de
              {' '}
              <span style={ { padding: '4px' } } data-testid="feedback-total-score">
                {
                  score
                }
              </span>
              {' '}
              pontos
            </ScoreMessage>
          </InfosDiv>
          <DivButtons>
            <Link
              to="/ranking"
              style={ {
                width: '45%',
              } }
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
              style={ {
                width: '45%',
              } }
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
          </DivButtons>
          <FeedbackFooter />
        </BackgroundDiv>
      );
    }

    if (assertions >= testScore) {
      return (
        <BackgroundDiv>
          <Header />
          <GravatarImg
            src={ ranking.find((entry) => entry.name === name).picture }
            alt={ name }
          />
          <InfosDiv>
            <FeedbackMessage
              data-testid="feedback-text"
              style={ { left: '34.89%' } }
            >
              Well Done!

            </FeedbackMessage>
            <AssertionsMessage>
              Você acertou
              {' '}
              <span style={ { padding: '4px' } } data-testid="feedback-total-question">
                {
                  assertions
                }
              </span>
              {' '}
              questões!
            </AssertionsMessage>
            <ScoreMessage>
              Um total de
              {' '}
              <span style={ { padding: '4px' } } data-testid="feedback-total-score">
                {
                  score
                }
              </span>
              {' '}
              pontos
            </ScoreMessage>
          </InfosDiv>
          <DivButtons>
            <Link
              to="/ranking"
              style={ {
                width: '45%',
              } }
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
              style={ {
                width: '45%',
              } }
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
          </DivButtons>
          <FeedbackFooter />
        </BackgroundDiv>
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
