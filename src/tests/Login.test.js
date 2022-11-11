import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react' 
import renderWithRouterAndReducer from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import { dataMock, tokenMock } from './helpers/mockData';

describe('Testando a tela de login', () => {
  afterEach(() => jest.clearAllMocks())

  test('Se o inputs e o botão de play funcionam', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValueOnce(tokenMock).mockResolvedValueOnce(dataMock)
    })

    const { history } = renderWithRouterAndReducer(<App />)

    const inputs = screen.getAllByRole('textbox')
    const name = inputs[0]
    const email = inputs[1]
    const buttonPlay = screen.getByTestId('btn-play')

    expect(buttonPlay).toBeDisabled()

    userEvent.type(name, 'Nome de teste');
    userEvent.type(email, 'youPass@gmail.com');

    expect(buttonPlay).not.toBeDisabled()
    
    userEvent.click(buttonPlay)
    console.log(buttonPlay)

    await waitForElementToBeRemoved(buttonPlay);

    const newPage = screen.getByText(/trybe/i);
    expect(newPage).toBeInTheDocument()
    expect(history.location.pathname).toMatch('/game')
    

  });
  
  test('Se o inputs e o botão de Configuração funciona', async () => {
    const { history } = renderWithRouterAndReducer(<App />)

    const buttonPlay = screen.getByTestId('btn-settings')

    expect(buttonPlay).not.toBeDisabled()
    
    userEvent.click(buttonPlay)
    
    const newPage = await screen.findByText(/configurações/i)
    
    expect(newPage).toBeInTheDocument()
    expect(history.location.pathname).toMatch('/settings')

  })
})