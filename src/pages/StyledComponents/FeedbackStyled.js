import styled from 'styled-components';
import trivia from '../../images/trivia.png';
import background from '../../images/background.png';

export const BackgroundDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%; 

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: black;
  background-image: url(${background});
  background-position: center;
`;

export const InfosDiv = styled.div`
  width: 50%; 
  height: 40%; 

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px;
  background: #FFFFFF;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  z-index: 1;

  @media(max-width: 1024px) {
    width: 85%
  }
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

  width: 10%; 
  height: 20%; 
  margin-bottom: -3%;
  border: 4px solid #EA5D5D;
  filter: drop-shadow(0px 0px 9px #EA5D5D);
  border-radius: 100%;

  z-index: 2;

  @media(max-width: 1024px) {
    width: 40%;
    height: 25%; 
    margin-bottom: -5%;
  }
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

`;

export const FeedbackMessage = styled.p`
  width: 100%; 
  height: auto; 
  
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;
  
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #EA5D5D;

  @media(max-width: 1024px){
    font-size: 22px
  }
`;

export const AssertionsMessage = styled.p`
  width: 100%; 
  height: auto;

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  /* or 24px */

  display: flex;
  align-items: center;
  justify-content: center;

  color: #B5B5B5;

`;

export const ScoreMessage = styled.p`
  width: 100%; 
  height: auto; 

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  /* or 24px */

  display: flex;
  align-items: center;
  justify-content: center;

  color: #B5B5B5;
`;

export const DivButtons = styled.div`
  width: 50%;

  display: flex;
  justify-content: space-between;

  z-index: 99;
  margin: 2%;

  @media(max-width: 1024px) {
    width: 80%;
  }
`;
