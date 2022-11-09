import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import GameOn from './pages/GameOn';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ GameOn } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}
