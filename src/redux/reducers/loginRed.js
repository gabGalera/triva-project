import { TOKEN_API, QUESTION_API, CHANGE_INDEX, CHANGE_SCORE } from '../actions';

const numberThree = 4;

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
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
  case CHANGE_INDEX:
    return {
      ...state,
      index: state.index === numberThree ? 0 : state.index + 1,
    };
  case CHANGE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default player;
