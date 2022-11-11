import React from 'react';
import { screen } from '@testing-library/react' 
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndReducer from './helpers/renderWithRouterAndRedux'
import Feedback from '../pages/Feedback'
import App from '../App'

describe('Testa a tela de feedbacks', () => {
  test('Testa a mensagem de feedback caso score >= 3', async () => {
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

    const INITIAL_STATE = {
      player: {
      name: '',
      assertions: 0,
      score: 3,
      gravatarEmail: '',
      token: '',
      }
    };

    const { history, store } = renderWithRouterAndReducer(<App />, INITIAL_STATE)

    const inputs = screen.getAllByRole('textbox')
    const name = inputs[0]
    const email = inputs[1]
    const buttonPlay = screen.getByTestId('btn-play')

    expect(buttonPlay).toBeDisabled()

    userEvent.type(name, 'Nome de teste');
    userEvent.type(email, 'youPass@gmail.com');

    expect(buttonPlay).not.toBeDisabled()
    
    userEvent.click(buttonPlay)
    
    history.push('/feedback')

    console.log(store.getState())

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