import styled from 'styled-components';
import trivia from '../../images/trivia.png';
import background from '../../images/background.png';

export const LoginContainer = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0px;
  width: 100%;
  top: 0px;
  background-image: url(${background});
  background-size: cover;
`;

export const LogoDiv = styled.div`
  width: 17.96875%; 
  height: 36.28922%; 

  background-image: url(${trivia});
  background-size: 100% 100%;

  @media(max-width: 1024px) {
    width: 57.96875%; 
    height: 46.28922%; 
  }
`;

export const LoginDiv = styled.div`
  width: 47.96875%;
  height: 36.28922%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  background: #FFFFFF;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  @media(max-width: 1024px) {
    width: 75.96875%; 
    height: 46.28922%; 
  }
`;

export const InputsLogin = styled.input`
  display: flex;
  padding: 0.9375% 2.1828%;
  gap: 1.3643%;
  background: #FFFFFF;
  width: 85%;
  height: 16.9172%;
  border: 1px solid #E1E5EB;
  border-radius: 0px;
  
`;

export const ButtonPlay = styled.button`
  padding: 0.9375% 2.18281%;
  gap: 1.3643%;
  width: 90%;
  height: 16.9172%;

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

export const ButtonSettings = styled.button`
  position: absolute;
  left: 0;
  top: 0;

  background: #2FC18C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;
