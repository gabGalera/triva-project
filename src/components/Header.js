import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // const { name, score } = this.props;
    const { name } = ranking[0];
    const { score } = ranking[0];
    const url = ranking[0].picture;
    // não tenho certeza sobre o formato dessa url
    return (
      <div>
        <img
          src={ url }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <h2
          data-testid="header-player-name"
        >
          { name }
        </h2>
        <h3
          data-testid="header-score"
        >
          { score }
        </h3>
      </div>
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
// export default Header;
