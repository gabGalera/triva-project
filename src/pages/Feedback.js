import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    const testScore = 3;
    console.log(score);

    if (score < testScore) return <h1 data-testid="feedback-text">Could be better...</h1>;

    if (score >= testScore) return <h1 data-testid="feedback-text">Well Done!</h1>;

    // return (
    //   <div>
    //     <h1 data-testid="feedback-text">Feedback</h1>
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
