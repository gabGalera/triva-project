import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { tokenAPI, questionsAPI } from '../redux/actions';
import { LogoDiv, LoginDiv, InputsLogin,
  LoginContainer, ButtonPlay, ButtonSettings } from './StyledComponents/LoginStyle';

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
    await dispatch(tokenAPI(name));
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
      <LoginContainer>
        <LogoDiv />
        <LoginDiv>
          <InputsLogin
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Qual é o seu e-mail do gravatar?"
            onChange={ this.handle }
            value={ email }
          />
          <InputsLogin
            name="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Qual é o seu nome?"
            onChange={ this.handle }
            value={ name }
          />
          <ButtonPlay
            type="button"
            data-testid="btn-play"
            disabled={ loginDisabled }
            onClick={ this.handleClick }
          >
            Play
          </ButtonPlay>
        </LoginDiv>
        <ButtonSettings
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsCLick }
        >
          Settings
        </ButtonSettings>
      </LoginContainer>
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
