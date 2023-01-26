import styled from 'styled-components';
import trivia from '../../images/trivia.png';

export const BackgroundDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%; // 625 / (625 + 253)

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

export const InfosDiv = styled.div`
  width: 50%; // 438 / 1280
  height: 40%; // 278 / (625)

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  z-index: 1;
`;

export const LogoTriviaFeedbackDiv = styled.div`
    width: 5.6672%; 
    height: 10%; 

    margin-top: 5%;

    background-image: url(${trivia});
    background-size: 100% 100%;

    z-index: 1;
`;

export const GravatarImg = styled.img`
  box-sizing: border-box;

  width: 10%; // 213 / 1280
  height: 20%; // 213 / 625
  margin-bottom: -1%;
  border: 4px solid #EA5D5D;
  filter: drop-shadow(0px 0px 9px #EA5D5D);
  border-radius: 100%;

  z-index: 2;
`;

export const RankingButton = styled.button`
  width: 100%; 
  height: 100%;

  background: #00D5E2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  letter-spacing: 0.12em;
  justify-content: center;

  color: #FFFFFF;

`;

export const PlayAgain = styled.button`
  width: 100%; 
  height: 100%;

  background: #2FC18C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  letter-spacing: 0.12em;
  justify-content: center;

  color: #FFFFFF;
  z-index: 3;
`;

export const FeedbackFooter = styled.footer`
  position: absolute;
  width: 100%;
  height: 30%; 
  top: 70%;
  background: #3C1B7A;

  // z-index: -1;
`;

export const FeedbackMessage = styled.p`
  width: 70.51%; // tentativa e erro tudo
  height: auto; // 
  
  margin-left: 18%;

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;
  
  text-transform: uppercase;

  display: flex;
  align-items: center;
  text-align: center;

  color: #EA5D5D;
`;

export const AssertionsMessage = styled.p`
  width: 50.51%; // tentativa e erro tudo
  height: auto; // 

  margin-left: 15%;
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  /* or 24px */

  display: flex;
  align-items: center;
  text-align: center;

  color: #B5B5B5;
`;

export const ScoreMessage = styled.p`
  width: 50.51%; // tentativa e erro tudo
  height: auto; // 

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  /* or 24px */

  margin-left: 20%;
  display: flex;
  align-items: center;
  text-align: center;

  color: #B5B5B5;
`;
