import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import star from '../images/star.png';

class Header extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { score, name } = this.props;
    const url = ranking[ranking.length - 1].picture;
    return (
      <div
        style={ {
          position: 'absolute',
          width: '100%',
          height: '17.546%', // 113 / (113 + 625)
          left: '0px',
          top: '0px',
          zIndex: '1',

          background: '#FFFFFF',
        } }
      >
        <img
          src={ url }
          alt={ name }
          data-testid="header-profile-picture"
          style={ {
            position: 'absolute',
            width: '2.89%', // 37 / 1280
            height: 'auto', // para manter quadrada 37 / 113
            left: '54.375%', // 696 / 1280
            top: '34.5132%', // 39 / 113

            borderRadius: '50%',
          } }
        />
        <div
          data-testid="header-player-name"
          style={ {
            position: 'absolute',
            width: '2.89%', // 37 / 1280
            height: '21.2389%', // 24 / 113
            left: '58.2812%', // 746 / 1280
            top: '43.36%', // 49 / 113

            fontFamily: 'Epilogue',
            fonStyle: 'normal',
            fontWeight: '400',
            fontSize: '1rem',
            lineHeight: '150%',
            /* identical to box height, or 24px */

            display: 'flex',
            alignItems: 'center',

            color: '#000000',
          } }
        >
          { name }
        </div>
        <div
          style={ {
            position: 'absolute',
            width: '2.334%', // 29.88 / 1280
            height: '25.30%', // 28.59 / 113
            left: '70.3578%', // 900.58 / 1280
            top: '37.168%', // 42 / 113
            backgroundImage: `url(${star})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          } }
        />
        <div
          data-testid="header-score"
          style={ {
            position: 'absolute',
            width: '7.89%', // 101 / 1280
            height: '21.2389%', // 24 / 113
            left: '73.6718%', // 943 / 1280
            top: '43.36%', // 49 / 113
          } }
        >
          {/* Pontos:
          {' '} */}
          { score }
        </div>
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
