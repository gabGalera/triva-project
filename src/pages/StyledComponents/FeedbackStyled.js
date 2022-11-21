import styled from 'styled-components';
import background from '../../images/background.png';
import trivia from '../../images/trivia.png';

export const BackgroundDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 71.1845%; // 625 / (625 + 253)

  background: url(${background});
`;

export const InfosDiv = styled.div`
  position: absolute;
  width: 34.21875%; // 438 / 1280
  height: 44.48%; // 278 / (625)
  left: 32.89%; // 421 / 1280
  top: 70.72%; // (329 + 113) / (625)

  background: #FFFFFF;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export const LogoTriviaFeedbackDiv = styled.div`
    position: absolute;
    width: 10.6672%; // 136.54 / 1280
    height: 33.966%; // tentativa e erro
    left: 44.675%; // 571.84 / 1280
    top: 10.5836%; // // tentativa e erro
    background-image: url(${trivia});
    background-size: 100% 100%;


    z-index: 1;
`;

export const GravatarImg = styled.img`
  box-sizing: border-box;

  position: absolute;
  width: auto; // 213 / 1280
  height: 34.08%; // 213 / 625
  left: 44%; // tentativa e erro
  top: 50.08%; // 200 + 133 / 625

  border: 4px solid #EA5D5D;
  filter: drop-shadow(0px 0px 9px #EA5D5D);
  border-radius: 100%;

  z-index: 1;
`;

export const RankingButton = styled.button`
  position: absolute;
  width: 16.60%; // 212.5 / 1280
  height: 6.09%; // 45 / (625 + 113)
  left: 32.89%; // 421 / 1280
  top: 118%; // tentativa e erro

  background: #00D5E2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12em;
  justify-content: center;

  color: #FFFFFF;

`;

export const PlayAgain = styled.button`
  position: absolute;
  width: 16.60%; // 212.5 / 1280
  height: 6.09%;
  left: 50.5859%; // 647.5 / 1280
  top: 118%; // tentativa e erro

  background: #2FC18C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12em;
  justify-content: center;

  color: #FFFFFF;
`;

export const FeedbackFooter = styled.footer`
  position: absolute;
  width: 100%;
  height: 30%; 
  top: 70%;

  background: #3C1B7A;

  z-index: -1;
`;

export const FeedbackMessage = styled.p`
  position: absolute;
  width: 50.51%; // tentativa e erro tudo
  height: auto; // 
  left: 26.89%; // 
  top: 30.89%; 

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;
  /* or 45px */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  color: #EA5D5D;
`;

export const AssertionsMessage = styled.p`
  position: absolute;
  width: 50.51%; // tentativa e erro tudo
  height: auto; // 
  left: 33.89%; // 
  top: 50.89%;

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
  position: absolute;
  width: 50.51%; // tentativa e erro tudo
  height: auto; // 
  left: 35.5%; // 
  top: 64.89%;

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
