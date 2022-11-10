import { TOKEN_API, QUESTION_API } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  token: '',
  index: 0,
  response_code: 0,
  questions: [],
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
      response_code: action.payload.response_code,
    };
  default:
    return {
      ...state,
    };
  }
};

export default player;
