const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', function () {
    if (this.id == 'clear') {
      printOutput('');
      printHistory('');
    } else if (this.id == 'backspace') {
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output == '' && history != '') {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != '' || history != '') {
        output = output == '' ? output : reverseNumberFormat(output);
        history += output;
        if (this.id == '=') {
          const result = eval(history);
          printOutput(result);
          printHistory('');
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput('');
        }
      }
    }
  });
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function () {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output += this.id;
      printOutput(output);
    }
  });
}

function getHistory() {
  return document.querySelector('.history-value').innerText;
}

function printHistory(num) {
  document.querySelector('.history-value').innerText = num;
}

function getOutput() {
  return document.querySelector('.output-value').innerText;
}

function printOutput(num) {
  if (num == '') {
    document.querySelector('.output-value').innerText = num;
  } else {
    document.querySelector('.output-value').innerText = getFormattedValue(num);
  }
}

function getFormattedValue(num) {
  if (num == '-') return '';
  const toNumber = Number(num);
  const value = toNumber.toLocaleString('en');
  return value;
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''));
}

const body = document.body;
const calculatorBase = document.querySelector('.calculator-base');
const darkBtn = document.querySelector('.dark');
const lightBtn = document.querySelector('.light');
const output = document.querySelector('.output-value');
const empty = document.querySelectorAll('.empty');

function setLightMode() {
  body.style.background = 'lightslategray';
  calculatorBase.style.background = 'white';
  calculatorBase.style.border = '2px solid black';
  output.style.color = 'black';
  lightBtn.style.background = 'steelblue';
  darkBtn.style.background = 'white';

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].style.background = 'white';
    numbers[i].style.color = 'black';
  }

  for (let i = 0; i < operators.length - 1; i++)
    operators[i].style.background = 'white';

  for (let i = 0; i < empty.length; i++) empty[i].style.background = 'white';
}

function setDarkMode() {
  body.style.background = '#282828';
  calculatorBase.style.background = 'black';
  calculatorBase.style.border = '2px solid white';
  output.style.color = 'white';
  lightBtn.style.background = 'white';
  darkBtn.style.background = 'steelblue';

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].style.background = 'black';
    numbers[i].style.color = 'white';
  }
  for (let i = 0; i < operators.length - 1; i++)
    operators[i].style.background = 'black';

  for (let i = 0; i < empty.length; i++) empty[i].style.background = 'black';
}

lightBtn.addEventListener('click', setLightMode);
darkBtn.addEventListener('click', setDarkMode);
