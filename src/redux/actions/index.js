export const TOKEN_API = 'TOKEN_API';
export const QUESTION_API = 'QUESTION_API';
// export const CHANGE_INDEX = 'CHANGE_INDEX';
export const RESQUEST_GRAVATAR = 'RESQUEST_GRAVATAR';

const setTokenApi = (obj) => ({
  type: TOKEN_API,
  payload: obj,
});

const setQuestions = (obj) => ({
  type: QUESTION_API,
  payload: obj,
});

// eslint-disable-next-line
// const newQuestion = (index) => ({
//   type: CHANGE_INDEX,
//   payload: index,
// });

export const tokenAPI = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((tokenObj) => dispatch(setTokenApi(tokenObj)));

export const questionsAPI = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json())
  .then((myResponse) => dispatch(setQuestions(myResponse)));
