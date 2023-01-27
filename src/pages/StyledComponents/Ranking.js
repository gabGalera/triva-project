import styled from 'styled-components';
import trivia from '../../images/trivia.png';
import background from '../../images/background.png';

export const BackgroundDiv = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60.95rem;
  background: url(${background});
  background-size: cover;

  @media(max-width: 1024px) {
    height: 50rem;
  }
`;

export const WhiteBoardDiv = styled.div`
  width: 38.20%; 
  height: 30rem;
  background: #FFFFFF;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 20px 0 40px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media(max-width: 1024px) {
    width: 90%; 
  }
`;

export const LogoTriviaGameDiv = styled.div`
    width: 15%; 
    height: 25%; 
    background-image: url(${trivia});
    background-size: 100% 100%;

    z-index: 1;
    @media(max-width: 1024px) {
      height: 20%;
      width: 45%; 
    }
  `;

export const RankingP = styled.p`
  width: 71.98%;
  height: 9.22; 

  font-family: Epilogue;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: #3C1B7A;

  display: flex;
  justify-content: center;
`;

export const ListDiv = styled.ul`
  width: 70%;
  overflow-y: scroll;

  @media(max-width: 1024px) {
    width: 90%;
    padding: 0;
  }
`;

export const Items = styled.li`
  height: 25%;
  margin: 16px;
  display: flex;
  padding-right: 15px;
  justify-content: space-between;
  align-items: center;

  background: #EBEBEB;
  border-radius: 100px;

  
`;

export const HomeButton = styled.button`
  width: 100%;
  padding: 10px;

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: #FFFFFF;
  background: #2FC18C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;
