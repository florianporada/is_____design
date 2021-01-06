import './style.scss';

function decisionLogic() {
  return Math.random() < 0.5;
}

function init() {
  const btnAsk = document.getElementById('Ask');
  const btnThanks = document.getElementById('Thanks');
  const wrapper = document.getElementById('Answer');
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

    const answer = decisionLogic();
    const span = document.getElementById('Answertext');

    span.innerText = answer ? 'Yes' : 'No';
    input.innerText = '';

    btnAsk.classList.add('disabled');
    wrapper.classList.add('show');
  };

  btnThanks.onclick = () => {
    wrapper.classList.remove('show');
    input.focus();
  };
}

init();
