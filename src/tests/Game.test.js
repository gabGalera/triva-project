import React from "react";
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { dataMock, tokenMock } from './helpers/mockData'
import renderWithRouterAndReducer from './helpers/renderWithRouterAndRedux';
import App from '../App'

describe('Testando o componente Game', () => {
  
  afterEach(() => jest.clearAllMocks());
  
  test('Se as perguntas estão funcionando quando acertamos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValueOnce(tokenMock).mockResolvedValueOnce(dataMock)
    })

    const { history, store } = renderWithRouterAndReducer(<App />)

    const inputs = screen.getAllByRole('textbox')
    const name = inputs[0]
    const email = inputs[1]
    const buttonPlay = screen.getByTestId('btn-play')

    expect(buttonPlay).toBeDisabled()

    userEvent.type(name, 'Nome de teste');
    userEvent.type(email, 'youPass@gmail.com');

    expect(buttonPlay).not.toBeDisabled()
    
    userEvent.click(buttonPlay)

    await waitForElementToBeRemoved(buttonPlay);

    const newPage = screen.getByText(/trybe/i);
    expect(newPage).toBeInTheDocument()
    expect(history.location.pathname).toMatch('/game')

    userEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()

    let { player: { score } } = store.getState();

    console.log(store.getState())
    
    expect(score).toBe(40)

    expect(screen.getByRole('button', { name: /next/i }))

  })
  })

  jest.setTimeout(32000);

  test.skip('Testando a funcionalidade do Timeout', async () => {
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

    // jest.setTimeout(31000)

    await waitFor(() => expect(screen.getAllByRole('button')[0]).toBeDisabled(), {
      timeout: 31000,
    })
  })
  // jest.setTimeout(5000);
