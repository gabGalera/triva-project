import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenAPI } from '../redux/actions';

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

  handleClick = async () => {
    const { dispatch, history } = this.props;
    await dispatch(tokenAPI());
    const { token } = this.props;
    localStorage.setItem('token', token);
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

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
});

Login.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Login);
