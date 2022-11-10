import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react' 
import renderWithRouterAndReducer from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mock = require('../redux/actions/index')

describe('Testando a tela de login', () => {
  afterEach(() => jest.clearAllMocks())

  test('Se o inputs e o botão de play funcionam', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValueOnce({
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }).mockResolvedValueOnce({
      "response_code":0,
      "results":[
          {
            "category":"Entertainment: Video Games",
            "type":"multiple",
            "difficulty":"easy",
            "question":"What is the first weapon you acquire in Half-Life?",
            "correct_answer":"A crowbar",
            "incorrect_answers":[
                "A pistol",
                "The H.E.V suit",
                "Your fists"
            ]
          },
          {             
            "category":"Entertainment: Video Games",
            "type":"boolean",
            "difficulty":"hard",
            "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
            "correct_answer":"False",
            "incorrect_answers":[
                "True"
            ]
          }
      ]
    })
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