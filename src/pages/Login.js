import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { tokenAPI, questionsAPI } from '../redux/actions';
import background from '../images/background.png';
import trivia from '../images/trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      loginDisabled: true,
    };
  }

  handle = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateLogin());
  };

  validateLogin = () => {
    const size = 1;
    const { name, email } = this.state;
    const nameValidate = name.length >= size;
    const emailValidate = email.length >= size;
    const buttonState = nameValidate && emailValidate;
    this.setState({ loginDisabled: !(buttonState) });
  };

  handleSettingsCLick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClick = async () => {
    const { email, name } = this.state;
    const { dispatch, history } = this.props;
    await dispatch(tokenAPI());
    const { token } = this.props;
    localStorage.setItem('token', token);

    let ranking = JSON.parse(localStorage.getItem('ranking'));

    if (ranking) {
      ranking.push({
        name,
        score: 0,
        picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
      });
    } else {
      ranking = [];
      ranking.push({
        name,
        score: 0,
        picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
      });
    }

    localStorage.setItem('ranking', JSON.stringify(ranking));
    await dispatch(questionsAPI(token));
    history.push('/game');
  };

  render() {
    const { name, email, loginDisabled } = this.state;
    return (
      <div
        style={ {
          height: '100%',
          position: 'absolute',
          left: '0px',
          width: '100%',
          top: '0px',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
        } }
      >
        <div
          style={ {
            position: 'absolute',
            width: '17.96875%', // 230 / 1280 (original width)
            height: '36.28922%', // 266 / 733 (original height)
            left: '41.01563%',
            top: '6.13506%',

            backgroundImage: `url(${trivia})`,
            backgroundSize: '100% 100%',
          } }
        />
        <div
          style={ {
            position: 'absolute',
            width: '47.96875%', // 614 / 1280
            height: '36.28922%', // 266 / 733
            left: '26.01563%', // 333 / 1280
            top: '43.1105%', // 316 / 733
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',

            background: '#FFFFFF',
            boxShadow: '1px 4px 13px 2px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          } }
        >
          {/* <h1 style={ { zIndex: '-1' } }>
            Trivia
          </h1> */}

          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Qual é o seu e-mail do gravatar?"
            onChange={ this.handle }
            value={ email }
            style={ {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0.9375% 2.1828%',
              gap: '1.3643%',

              /* white */

              background: '#FFFFFF',
              /* gray 300 */

              width: '85%',
              height: '16.9172%',

              border: '1px solid #E1E5EB',
              borderRadius: '0px',
            } }
          />

          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Qual é o seu nome?"
            onChange={ this.handle }
            value={ name }
            style={ {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0.9375% 2.18281%',
              gap: '1.3643%',

              /* white */

              background: '#FFFFFF',
              /* gray 300 */

              width: '85%', // 519 / 614
              height: '16.9172%', // 45 / 266

              border: '1px solid #E1E5EB',
              borderRadius: '0px',
            } }
          />

          <button
            type="button"
            data-testid="btn-play"
            disabled={ loginDisabled }
            onClick={ this.handleClick }
            style={ {
              // position: 'absolute',

              padding: '0.9375% 2.18281%',
              gap: '1.3643%',
              width: '90%', // ? / 614
              height: '16.9172%', // 45 / 266
              // left: '380px',
              // top: '496px',

              background: '#2FC18C',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
            } }
          >
            {' '}
            Play

          </button>

        </div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsCLick }
          style={ {
            // position: 'absolute',
            // width: '519px',
            // height: '45px',
            // left: '50%',
            // top: '496px',

            background: '#2FC18C',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '5px',
          } }
        >
          Settings
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  name: state.player.name,
});

Login.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Login);
