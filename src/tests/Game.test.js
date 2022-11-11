import React from "react";
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { dataMock, tokenMock } from './helpers/mockData'
import renderWithRouterAndReducer from './helpers/renderWithRouterAndRedux';
import App from '../App'

describe('Testando o componente Game', () => {
  
  afterEach(() => jest.clearAllMocks());
  
  test('Jogando uma partida', async () => {
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

    userEvent.click(screen.getByText(/crowbar/i))
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()

    let { player: { score } } = store.getState();

    console.log(store.getState().player.questions)
    
    expect(score).toBe(40)

    userEvent.click(screen.getByRole('button', { name: /next/i })); 
    
    userEvent.click(screen.getByText(/false/i))

    score = store.getState().player.score;
    
    expect(score).toBe(140)

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    userEvent.click(screen.getByText(/950/))

    score = store.getState().player.score;

    expect(score).toBe(140);

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    userEvent.click(screen.getByText(/chip/i));

    score = store.getState().player.score;

    expect(score).toBe(210);

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    userEvent.click(screen.getByText(/false/i));

    score = store.getState().player.score;

    expect(score).toBe(310);

    userEvent.click(screen.getByRole('button', { name: /next/i }));
    
    expect(screen.getByText(/nome/i)).toBeInTheDocument()
  })

  })

  test('Testa se a API falhou', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValueOnce(tokenMock)
      .mockResolvedValueOnce({
        "response_code":0,
        "results":[]}
        )
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
