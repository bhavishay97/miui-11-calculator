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
