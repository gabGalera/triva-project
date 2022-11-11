import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { tokenAPI, questionsAPI } from '../redux/actions';

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
      <div>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
        <h1>
          Trivia
        </h1>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          placeholder="Name"
          onChange={ this.handle }
          value={ name }

        />

        <input
          name="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="email"
          onChange={ this.handle }
          value={ email }
        />

        <button
          type="button"
          data-testid="btn-play"
          disabled={ loginDisabled }
          onClick={ this.handleClick }
        >
          {' '}
          Play

        </button>
        <br />
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsCLick }
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
