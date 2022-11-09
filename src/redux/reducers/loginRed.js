import { TOKEN_API } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_API:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return {
      ...state,
    };
  }
};

export default player;
