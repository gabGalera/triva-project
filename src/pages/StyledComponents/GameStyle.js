import styled from 'styled-components';
import trivia from '../../images/trivia.png';
import background from '../../images/background.png';

export const LogoTriviaGameDiv = styled.div`
    width: 60.3976%; 
    height: 100.8536%; 
    background-image: url(${trivia});
    background-size: 100% 100%;

    z-index: 1;
    @media(max-width: 1024px) {
      width: 0%; 
      margin-bottom: 0%;
    }
  `;

export const BackgroundGameDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 84.688%; 
  left: 0px;
  top: 11.517%; 
  display: flex;

  align-items: center;
  justify-content: space-evenly;

  background-image: url(${background});
  backgroundSize: contain;

  @media(max-width: 1024px) {
    flex-direction: column;
  }
`;

export const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 75%;
  margin-bottom: 15%;

  @media(max-width: 1024px) {
    width: 90.5469%;
    height: 50%; 
    margin-bottom: 2%;
  }
`;

export const QuestionCategoryDiv = styled.div`
  width: 80.2656%; 
  height: 20.0975%; 

  margin-bottom: -2%;
  background: #F9BA18;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  font-size: 1rem;
  letter-spacing: 0.12em;

  z-index: 2;
  color: #FFFFFF;

  @media(max-width: 1024px) {
    width: 80.5469%;
    height: 50%; 
    // margin-bottom: 5%;
  }

`;

export const CorrectButton = styled.button`
  width: 100%;
  height: 64px;

  background: #FFFFFF;
  border-radius: 100px;

  font-family: Epilogue;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  display: flex;
  align-items: center;
  letter-spacing: 0.12em;

`;

export const QuestionTextDiv = styled.div`
  width: 100%; // 439 / 1280
  height: 100%; // 286 / (113 + 625)

  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: space-evenly;

  font-family: Epilogue;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem; // 16 /
  line-height: 150%;

  color: #000000;

  background: #FFFFFF;
  z-index: 1;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  @media(max-width: 1024px) {
    width: 90.5469%;
    height: 200%; 
  }
`;

export const ParentClockDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10%;
  width: 32.26%; // 413 / 1280
  height: 5.15%; // 38 / (113 + 625)

  z-index: 6;
  font-size: 1rem;
`;

export const AnswerOptionsTrueFalseDiv = styled.div`
  box-sizing: border-box;

  width: 40.5469%; 
  height: 20.05%; 

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  z-index: 1;
  background: transparent;

  @media(max-width: 1024px) {
    width: 90.5469%; 
  }
`;

export const AnswerOptionsMultipleDiv = styled.div`
  box-sizing: border-box;

  width: 40.5469%; 
  height: 42.95%; 

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  z-index: 1;
  background: transparent;

  @media(max-width: 1024px) {
    width: 90.5469%; 
  }
`;

export const GameFooter = styled.footer`
  position: absolute;
  width: 100%;
  height: 23.6%; 

  top: 76.4%; 
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background: #3C1B7A;
`;

export const NextButton = styled.button`
  
  width: 38%; // 519 / 1280
  height: 20%; // 45 / 166

  background: #2FC18C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  font-family: Epilogue;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  color: #FFFFFF;

  margin-right: 11%;
  margin-bottom: 8%;
  z-index: 6;

  @media(max-width: 1024px) {
    margin-bottom: 0.5%;
    margin-right: 0%;
  }
`;
