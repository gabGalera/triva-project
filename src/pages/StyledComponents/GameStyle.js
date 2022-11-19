import styled from 'styled-components';
import trivia from '../../images/trivia.png';
import background from '../../images/background.png';

export const LogoTriviaGameDiv = styled.div`
    position: absolute;
    width: 15.3976%; 
    height: 26.8536%; 
    left: 16.7968%; 
    top: 3.523%; 
    background-image: url(${trivia});
    background-size: 100% 100%;


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

export const ParentClockDiv = styled.div`
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

export const AnswerOptionsTrueFalseDiv = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 40.5469%; // 519 / 1280
  height: 20.05%; // topFinal - topInicial + heightFinal + 1
  // 444 - 361 + 64 + 1 = 148 => 148 / (113 + 625)
  left: 51.64%; // 661 / 1280
  top: 48.91%; // 361 / (113 + 625)

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  z-index: 1;
  background: transparent;
`;

export const AnswerOptionsMultipleDiv = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 40.5469%; // 519 / 1280
  height: 42.95%; // topFinal - topInicial + heightFinal + 1 
  // 480 - 228 + 64 + 1 = 317 => 317 / (113 + 625)
  left: 51.64%; // 661 / 1280
  top: 30.89%; // 228 / (113 + 625)

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  z-index: 1;
  background: transparent;
`;

export const GameFooter = styled.footer`
  position: absolute;
  width: 100%;
  height: 23.6%; // tentativa e erro

  top: 76.4%; // tentativa e erro

  background: #3C1B7A;
`;

export const NextButton = styled.button`
  position: absolute;
  width: 40.5468%; // 519 / 1280
  height: 27.108%; // 45 / 166
  left: 51.64%; // 661 / 1280
  top: 8.14558%; // 1 - ((575 - 45) / 577)

  background: #2FC18C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  font-family: Epilogue;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  color: #FFFFFF;
`;

export const timer = () => {
  const thousand = 1000;
  const timeLimit = 30;
  const clock = setInterval(() => {
    if (document.getElementById('clock') === null) {
      clearInterval(clock);
    } else if (document.getElementById('clock').innerHTML === timeLimit) {
      clearInterval(clock);
    } else if (document.getElementById('clock').innerHTML > 1) {
      document.getElementById('clock').innerHTML -= 1;
    } else if (document.getElementById('clock').innerHTML === '1') {
      document.getElementsByName('correct').forEach((correctAnswer) => {
        correctAnswer.disabled = true;
      });
      document.getElementsByName('incorrect').forEach((wrong) => {
        wrong.disabled = true;
      });
      document.getElementById('clockParent').innerHTML = 'Acabou o tempo.';
      clearInterval(clock);
    }
  }, thousand);
};
