import React from 'react';
import { screen } from '@testing-library/react' 
import renderWithRouterAndReducer from './helpers/renderWithRouterAndRedux'
import Feedback from '../pages/Feedback'

describe('Testa a tela de feedbacks', () => {
  test('Testa a mensagem de feedback caso score >= 3', () => {
    const INITIAL_STATE = {
      player: {
      name: '',
      assertions: 0,
      score: 3,
      gravatarEmail: '',
      token: '',
    }
  };

    renderWithRouterAndReducer(<Feedback />, INITIAL_STATE)

    expect(screen.queryByText(/well done/i)).toBeInTheDocument();

  })

  test('Testa a mensagem de feedback caso score < 3', () => {
    const INITIAL_STATE = {
      player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      token: '',
    }
  };

    renderWithRouterAndReducer(<Feedback />, INITIAL_STATE)

    expect(screen.queryByText(/could be better/i)).toBeInTheDocument();

  })
})