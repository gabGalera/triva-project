const timer = () => {
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

export default timer;
