export const TOKEN_API = 'TOKEN_API';

const setTokenApi = (obj) => ({
  type: TOKEN_API,
  payload: obj,
});

export const tokenAPI = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((tokenObj) => dispatch(setTokenApi(tokenObj)));
