import styled from 'styled-components';
import trivia from '../images/trivia.png';
import background from '../images/background.png';

export const LogoTriviaGameDiv = styled.div`
    position: absolute;
    width: 15.3976%; 
    height: 26.8536%; 
    left: 16.7968%; 
    top: 3.523%; 
    // background-color: red;
    background-image: url(${trivia});
    background-size: 100% 100%;
    // background-repeat: 'no-repeat';

    z-index: 1;
`;

export const BackgroundGameDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 84.688%; // 625 / (113 + 625)
  left: 0px;
  top: 11.517%; // 85 / (113 + 625)

  background-image: url(${background});
  backgroundSize: contain;
`;

export const QuestionCategoryDiv = styled.div`
  position: absolute;
  width: 32.2656%; // 413 / 1280
  height: 6.0975%; // 45 / (113 + 625)
  left: 8.9%; // 114 / 1280
  top: 37.2629%; // 275 / (113 + 625)

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
}
`;

export const QuestionTextDiv = styled.div`
  position: absolute;
  width: 34.2968%; // 439 / 1280
  height: 38.75%; // 286 / (113 + 625)
  left: 7.89%; // 101 / 1280
  top: 40.65%; // 300 / (113 + 625)

  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: center;

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
`;

export const parentClockDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32.26%; // 413 / 1280
  height: 5.15%; // 38 / (113 + 625)
  left: 8.9%; // 114 / 1280
  top: 73.85%;
  z-index: 6;
  font-size: 1rem;
`;
