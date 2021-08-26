//Const and variables//
const num = document.getElementById('cNumber')
const result = document.getElementById('cResult')
const cOperator = document.getElementById('cOperator');
const b1 = document.getElementById('one');
const b2 = document.getElementById('two');
const b3 = document.getElementById('three');
const b4 = document.getElementById('four');
const b5 = document.getElementById('five');
const b6 = document.getElementById('six');
const b7 = document.getElementById('seven');
const b8 = document.getElementById('eight');
const b9 = document.getElementById('nine');
const b0 = document.getElementById('zero');

const bSub = document.getElementById('substract');
const bDot = document.getElementById('dot');
const bSum = document.getElementById('sum');
const bNeg = document.getElementById('negative');
const bDiv = document.getElementById('divide');
const bMul = document.getElementById('multiply');
const bEql = document.getElementById('result');
const bCe = document.getElementById('clearNum2');
const bClr = document.getElementById('clear');


let operator;

//Flags
let isSolved;
let isFloat = false;
let isNegative = false;

//Mouse controls//
b1.addEventListener('click', () => { addDigit('1') });
b2.addEventListener('click', () => { addDigit('2') });
b3.addEventListener('click', () => { addDigit('3') });
b4.addEventListener('click', () => { addDigit('4') });
b5.addEventListener('click', () => { addDigit('5') });
b6.addEventListener('click', () => { addDigit('6') });
b7.addEventListener('click', () => { addDigit('7') });
b8.addEventListener('click', () => { addDigit('8') });
b9.addEventListener('click', () => { addDigit('9') });
b0.addEventListener('click', () => { addDigit('0') });
bDot.addEventListener('click', addDot);
bNeg.addEventListener('click', addNeg);
bCe.addEventListener('click', clearNum);
bClr.addEventListener('click', clear);

bSum.addEventListener('click', () => { displayOp('+'); });
bSub.addEventListener('click', () => { displayOp('-'); });
bDiv.addEventListener('click', () => { displayOp('/'); });
bMul.addEventListener('click', () => { displayOp('x'); });
bEql.addEventListener('click', displayResult);

//Keyboard Controls//
window.addEventListener('keypress', recognizeKey);


//Functions//
function displayOp(opt) {
  if (result.textContent != '' && num.textContent != '') {
    isSolved = false;
    solveOperation();
    operator = opt;
    result.textContent = '';
    cOperator.textContent = operator;
    isFloat = false;
    isNegative = false;
  } else if (result.textContent != '') {
    isSolved = false;
    num.textContent = result.textContent;
    result.textContent = '';
    operator = opt;
    cOperator.textContent = operator;
    isFloat = false;
    isNegative = false;
  } else {
    isSolved = false;
    operator = opt;
    cOperator.textContent = operator;
  }
}

function displayResult() {
  if (result.textContent != '' && num.textContent != '') {
    solveOperation();
    isSolved = true;
    result.textContent = '';
    operator = '';
    cOperator.textContent = operator;
    isFloat = false;
    isNegative = false;
  } else if (result.textContent != '') {
    isSolved = true;
    num.textContent = result.textContent;
    result.textContent = '';
    operator = '';
    cOperator.textContent = operator;
    isFloat = false;
    isNegative = false;
  } else {
    isFloat = false;
    isNegative = false;
  }
}

function clear() {
  result.textContent = '';
  num.textContent = '';
  operator = '';
  cOperator.textContent = operator;
  isSolved = false;
  isFloat = false;
  isNegative = false;
}

function clearNum() {
  result.textContent = '';
  isFloat = false;
  isNegative = false;
  cOperator.textContnt = operator;
}

function addDigit(x) {
  if ((result.textContent).length > 30) {
    alert('Max digits reached')
  } else if (isSolved == true) {
    clear()
    result.textContent = x;
  } else {
    result.textContent += x
  }
}

function addDot() {
  if (result.textContent != '' && isFloat === false) {
    result.textContent = result.textContent + '.';
    isFloat = true;
  } else if (isSolved == true) {
    clear()
    addDot()
  } else if (result.textContent == '' && isFloat === false) {
    result.textContent = '0.';
    isFloat = true;
  }
}

function addNeg() {
  if (result.textContent != '' && isNegative === false) {
    result.textContent = '-' + result.textContent;
    isNegative = true;
  } else {

  }
}

function solveOperation() {
  switch (operator) {
    case '+':
      num.textContent = sum(num.textContent, result.textContent);
      if (num.textContent == 'NaN') { num.textContent = 'Syntax Error'; }
      result.textContent = '';
      break;

    case '-':
      num.textContent = substract(num.textContent, result.textContent);
      if (num.textContent == 'NaN') { num.textContent = 'Syntax Error'; }
      result.textContent = '';
      break;

    case '/':
      num.textContent = divide(num.textContent, result.textContent);
      if (num.textContent == 'NaN') { num.textContent = 'Syntax Error'; }
      result.textContent = '';
      break;

    case 'x':
      num.textContent = multiply(num.textContent, result.textContent);
      if (num.textContent == 'NaN') { num.textContent = 'Syntax Error'; }
      result.textContent = '';
      break;

    default:
      break;
  }
}

function sum(a, b) {
  return parseFloat((parseFloat(a) + parseFloat(b)).toFixed(2));
}

function substract(a, b) {
  return parseFloat((parseFloat(a) - parseFloat(b)).toFixed(2));
}

function multiply(a, b) {
  return parseFloat((parseFloat(a) * parseFloat(b)).toFixed(2));
}

function divide(a, b) {
  return parseFloat((parseFloat(a) / parseFloat(b)).toFixed(2));
}

function recognizeKey(e) {
  const pressedKey = document.querySelector
    (`button[data-key = '${e.keyCode ? e.keyCode : e.charCode}']`);

  switch (pressedKey.textContent) {
    case '=':
      displayResult();
      break;

    case '+':
      displayOp('+')
      break;

    case '-':
      displayOp('-')
      break;

    case 'X':
      displayOp('x')
      break;

    case '/':
      displayOp('/')
      break;

    case '.':
      addDot();
      break;

    default:
      addDigit(pressedKey.textContent);
      break;
  }
}