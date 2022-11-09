import React from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const { name, email, loginDisabled } = this.state;
    return (
      <div>

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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
