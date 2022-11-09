import { combineReducers } from 'redux';
import player from './loginRed';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const myReducer = combineReducers({
  player,
});

export default myReducer;
