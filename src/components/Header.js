import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainDiv, ProfilePic, NameP, StarDiv, ScoreDiv } from './HeaderStyles';

class Header extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { score, name } = this.props;
    const url = ranking[ranking.length - 1].picture;
    return (
      <MainDiv>
        <ProfilePic
          src={ url }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <NameP
          data-testid="header-player-name"
        >
          { name }
        </NameP>
        <StarDiv />
        <ScoreDiv
          data-testid="header-score"
        >
          { score }
        </ScoreDiv>
      </MainDiv>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
