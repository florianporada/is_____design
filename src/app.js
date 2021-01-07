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
  const input = document.getElementById('Input');
  const span = document.getElementById('Answertext');

  input.focus();
  input.addEventListener('input', updateValue);
  answerContent.classList.remove('display-none');

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
      span.innerText = answer ? 'Yes.' : 'No.';

      btnAsk.classList.add('disabled');
      btnAsk.classList.add('hide');
      input.setAttribute('contenteditable', 'false');

      setTimeout(() => {
        answerContent.classList.add('show');
        answerContent.classList.remove('hide');
        btnAsk.classList.remove('show');
      }, 500);
    });
  };

  btnThanks.onclick = () => {
    answerContent.classList.add('hide');

    setTimeout(() => {
      btnAsk.classList.remove('hide');
      btnAsk.classList.add('show');
      input.setAttribute('contenteditable', 'true');
      input.focus();

      span.innerText = '';
      input.innerText = '';
    }, 500);
  };
}

init();
