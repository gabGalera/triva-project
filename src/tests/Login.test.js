import React from 'react';
import { screen } from '@testing-library/react' 
import renderWithRouterAndReducer from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';

describe('Testando a tela de login', () => {
  test('Se o inputs e o botão funcionam', () => {
    renderWithRouterAndReducer(<App />)

    const inputs = screen.getAllByRole('textbox')
    const name = inputs[0]
    const email = inputs[1]
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()

    userEvent.type(name, 'Nome de teste');
    userEvent.type(email, 'youPass@gmail.com');

    expect(button).not.toBeDisabled()

    userEvent.click(button)

  })
})