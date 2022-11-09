import { TOKEN_API, QUESTION_API } from '../actions';

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
  case QUESTION_API:
    return {
      ...state,
      questions: action.payload.results,
    };
  default:
    return {
      ...state,
    };
  }
};

export default player;
