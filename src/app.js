import './style.scss';

function decisionLogic() {
  const url =
    'https://www.random.org/integers/?num=1&min=0&max=1&col=1&base=10&format=plain&rnd=new';
  return fetch(url)
    .then((response) => {
      return response.text().then((text) => {
        return parseInt(text, 10);
      });
    })
    .catch(() => {
      return Math.random() < 0.5;
    });
}

function init() {
  const btnAsk = document.getElementById('Ask');
  const btnThanks = document.getElementById('Thanks');
  const answerContent = document.getElementById('Answer');
  const questionContent = document.getElementById('Question');
  const input = document.getElementById('Input');

  input.focus();
  input.addEventListener('input', updateValue);

  function updateValue() {
    const currentInput = document.getElementById('Input').innerText;

    if (currentInput.trim() !== '') {
      btnAsk.classList.remove('disabled');
    } else {
      btnAsk.classList.add('disabled');
    }
  }

  btnAsk.onclick = () => {
    if (document.getElementById('Ask').classList.contains('disabled')) {
      input.focus();

      return;
    }

    decisionLogic().then((answer) => {
      const span = document.getElementById('Answertext');

      span.innerText = answer ? 'Yes' : 'No';

      btnAsk.classList.add('disabled');
      questionContent.classList.add('hide');

      setTimeout(() => {
        answerContent.classList.add('show');
        input.innerText = '';
      }, 500);
    });
  };

  btnThanks.onclick = () => {
    answerContent.classList.remove('show');
    questionContent.classList.remove('hide');
    input.focus();
  };
}

init();
