import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { score } = this.props;
    const { name } = ranking[ranking.length - 1];
    const url = ranking[ranking.length - 1].picture;
    return (
      <div
        style={ {
          // position: 'absolute',
          // width: '100%',
          // height: '100%',
          // left: '0px',
          // top: '0px',

          // background: '#FFFFFF',
        } }
      >
        <img
          src={ url }
          alt={ name }
          data-testid="header-profile-picture"
          style={ {
            // position: 'absolute',
            // width: '37px',
            // height: '37px',
            // left: '696px',
            // top: '39px',
          } }
        />
        <h2
          data-testid="header-player-name"
          style={ {
            position: 'absolute',
            width: '146px',
            height: '24px',
            left: '746px',
            top: '49px',

            // font-family: 'Epilogue';
            // font-style: normal;
            // font-weight: 400;
            // font-size: 16px;
            // line-height: 150%;
            /* identical to box height, or 24px */

            display: 'flex',
            alignItems: 'center',

            color: '#000000',
          } }
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
  // name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
// export default Header;
