var upperDisplayValue = "";
var lowerDisplayValue = "";
const UPPER_DISPLAY_LENGTH = 15;
const LOWER_DISPLAY_LENGTH = 13;

function operate(operator,num1,num2) {
  console.log('Operate called with: ' + operator + ' and ' + num1 + ' and ' + num2);
  switch (operator) {
    case '/':
    return num1 / num2;
    break;
    case '*':
    return num1 * num2;
    break;
    case '-':
    return num1 - num2;
    break;
    case '+':
    return num1 + num2;
    break;
    default:
    return 'ERROR';
  }
}

function getNumbersAndOperator_old(str) {
  console.log('getNumbersAndOperator called with ' + str);
  // Use a regular expression with capture groups to extract the two numbers and the operator
  let result = str.match(/(-?\.?\d+)(e[\+\-]?\d+)?([\+\-\*\/]|--|\/-)(-?\.?\d+)(e[\+\-]?\d+)?/);
  // let result = str.match(/0?(-?\.\d+)(e[\+\-]?\d+)?([\+\-\*\/]|--|\/-)(0?-?\.\d+)(e[\+\-]?\d+)?/);
  if (result) {
    // Convert the extracted numbers to decimals
    let num1 = parseFloat(result[1] + result[2]);
    let num2 = parseFloat(result[4] + result[5]);
    
    // If the operator is "--", convert it to "-", and negate num2
    if (result[3] === "--") {
      result[3] = "-";
      num2 = -num2;
    }
    
    // If the operator is "/-", convert it to "/", and negate num2
    if (result[3] === "/-") {
      result[3] = "/";
      num2 = -num2;
    }
    
    // If the operator is "+-", convert it to "+", and negate num2
    if (result[3] === "+-") {
      result[3] = "+";
      num2 = -num2;
    }
    
    // If the operator is "*-", convert it to "*", and negate num2
    if (result[3] === "*-") {
      result[3] = "*";
      num2 = -num2;
    }
    
    // Return an object with the two numbers (as decimals) and the operator
    return {
      num1: num1,
      operator: result[3],
      num2: num2
    };
  } else {
    // Return null if no arithmetic expression was detected
    return null;
  }
}

function getNumbersAndOperator(str) {
  console.log('getNumbersAndOperator called with ' + str);
  // Use a regular expression with capture groups to extract the two numbers and the operator
  let result = str.match(/(0?(-?\d+(\.\d+)?)|(-?\.\d+))(e[\+\-]?\d+)?([\+\-\*\/]|--|\/-|\+-|\*-)(0?-?\d+(\.\d+)?|(-?\.\d+))(e[\+\-]?\d+)?/);
  if (result) {
    // Convert the extracted numbers to decimals
    let num1 = parseFloat(result[1] + result[4] + result[5]);
    let num2 = parseFloat(result[7] + result[10] + result[11]);
    
    // If the operator is "--", convert it to "-", and negate num2
    if (result[6] === "--") {
      result[6] = "-";
      num2 = -num2;
    }
    
    // If the operator is "/-", convert it to "/", and negate num2
    if (result[6] === "/-") {
      result[6] = "/";
      num2 = -num2;
    }
    
    // If the operator is "+-", convert it to "+", and negate num2
    if (result[6] === "+-") {
      result[6] = "+";
      num2 = -num2;
    }
    
    // If the operator is "*-", convert it to "*", and negate num2
    if (result[6] === "*-") {
      result[6] = "*";
      num2 = -num2;
    }
    
    // Return an object with the two numbers (as decimals) and the operator
    return {
      num1: num1,
      operator: result[6],
      num2: num2
    };
  } else {
    // Return null if no arithmetic expression was detected
    return null;
  }
}

function lastCharIsNumber(str) {
  // Get the last character of the string
  const lastChar = str[str.length - 1];
  
  // Check if the last character is a number between 0 and 9
  if (lastChar >= '0' && lastChar <= '9') {
    return true;
  } else {
    return false;
  }
}

function performOp(opStr) {
  let lowerDisplay = document.getElementById("lower-display");
  let upperDisplay = document.getElementById("upper-display");
  
  // First check for the case where there are numbers in both displays and the upper display has no
  // operand. This means that the upper display will be treated as an answer, but not included
  // in a new operation. (The user is not required to clear the caluclator with 'AC' to begin
  // a new operation.)
  if ((upperDisplay.textContent.length > 0) && (lowerDisplay.textContent.length > 0)
  && lastCharIsNumber(upperDisplay.textContent)) {
    console.log('Numbers in both displays but upper number has no operand.');
    console.log(upperDisplay.textContent + lowerDisplay.textContent);
    upperDisplay.textContent = lowerDisplay.textContent +opStr;
    lowerDisplay.textContent = "";
  }
  // check to see if there are numbers in the upper and lower displays
  else if ((upperDisplay.textContent.length > 0) && (lowerDisplay.textContent.length > 0)) {
    console.log('Numbers in both displays.');
    console.log(upperDisplay.textContent + lowerDisplay.textContent);
    let operands  = getNumbersAndOperator(upperDisplay.textContent + lowerDisplay.textContent);
    console.table(operands);
    if (operands != null) {
      let result = operate(operands.operator, operands.num1, operands.num2);
      console.log('Operate returned a result of: ' + result);
      upperDisplay.textContent = result + opStr;
      lowerDisplay.textContent = "";
    }
    // check if there is a number in only the upper display
  } else if ((upperDisplay.textContent.length > 0) && (lowerDisplay.textContent.length === 0)) {
    console.log('Numbers in only upper display.');
    if (lastCharIsNumber(upperDisplay.textContent)) {
      upperDisplay.textContent += opStr;
    }
  }
  // check if there is a number in only the lower display
  else if ((upperDisplay.textContent.length === 0) && (lowerDisplay.textContent.length > 0)) {
    console.log('Numbers in only lower display.');
    upperDisplay.textContent = lowerDisplay.textContent + opStr;
    lowerDisplay.textContent = "";
  }
  validateDisplays(upperDisplay,lowerDisplay);
}

function validateDisplays(ud, ld) {
  let udStr = ud.textContent;
  let ldStr = ld.textContent;
  let udNum = parseFloat(udStr);
  let ldNum = parseFloat(ldStr);
  // console.log('Inside validateDisplay with udStr and ldStr: ' + udStr + ' ' + ldStr);
  if (ud.textContent.length > UPPER_DISPLAY_LENGTH) {
    ud.textContent = udNum.toExponential(UPPER_DISPLAY_LENGTH - 7);
  }
  if (ld.textContent.length > LOWER_DISPLAY_LENGTH) {
    ld.textContent = ldNum.toExponential(LOWER_DISPLAY_LENGTH - 7);
  }
}

function stripNumber(num) {
  // Convert the number to a string
  num = num.toString();
  // Remove the negative sign if it exists
  num = num.replace(/-/g, '');
  // Remove any non-numeric characters from the final digit
  num = num.replace(/[^0-9]/g, '');
  // Convert the string back to a number
  num = Number(num);
  return num;
}


function handlePercent(ud,ld) {
  // if there is an operand in only the upper display and it has no operator then return that operand/100
  if (((ud.textContent.length > 0) && (ld.textContent.length === 0)) 
  && lastCharIsNumber(ud.textContent)) {
    ud.textContent = ud.textContent / 100;
    
  } 
  // if there is an operand in only the upper diplay and it has a trailing operator then do nothing (ignore)
  else if (((ud.textContent.length > 0) && (ld.textContent.length === 0)) 
  && (lastCharIsNumber(ud.textContent) === false)) {
    // do nothing
  }
  // if there is an operand in only the lower display and it has no operator then return that operand/100
  else if (((ud.textContent.length === 0) && (ld.textContent.length > 0))
  && (lastCharIsNumber(ud.textContent) === false)) {
    ld.textContent = ld.textContent / 100;
  }
  // if there is an operand in only the lower diplay and it has a trailing operator then do nothing (ignore)
  else if (((ud.textContent.length === 0) && (ld.textContent.length > 0)) 
  && lastCharIsNumber(ld.textContent)){
    // do nothing
  }
  
  // if there is an operand in both displays then ....
  else if ((ud.textContent.length > 0) && (ld.textContent.length > 0)) {
    console.log('PERCENT: operand in both displays');
    //  if the upper operand has no trailing operator then multiply the lower operand by 1/100 and move it to
    //  the upper display. Clear the lower display
    if (lastCharIsNumber(ud.textContent)) {
      ud.textContent = ld.textContent / 100;
      ld.textContent = "";
    } else if (lastCharIsNumber(ud.textContent) === false) {
      console.log('PERCENT: operand in both displays. and upper has a trailing operator');
      //  if the upper operand has a trailing operator (and it is + or -) then change the lower operand to
      //  (the upper operand * (lower operand/100)
      switch (ud.textContent.charAt(ud.textContent.length - 1)) {
        case '+':
        case '-':
        console.log('found a + or -');
        ld.textContent = (stripNumber(ud.textContent) * (ld.textContent/100));
        validateDisplays(ud, ld);
        break;
        //  if the upper operand has a trailing operator (and it is / or *) then change the lower operand to
        //  its value/100
        case '/':
        case '*':
        console.log('found a / or *');
        ld.textContent = ld.textContent / 100;
        validateDisplays(ud, ld);
        break;
      }
    }
  }
}

function setupButtons() {
  const buttons = document.querySelectorAll('.btn');
  let upperDisplay = document.getElementById("upper-display");
  let lowerDisplay = document.getElementById("lower-display");
  
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      switch (button.id) {
        case 'allclear':
        lowerDisplay.textContent = "";
        upperDisplay.textContent = "";
        break;
        case 'seven':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "7";
        break;
        case 'eight':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "8";
        break;
        case 'nine':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "9";
        break;
        case 'divide':
        performOp('/');
        break;
        case 'clear':
        lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
        break;
        case 'four':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "4";
        break;
        case 'five':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "5";
        break;
        case 'six':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "6";
        break;
        case 'multiply':
        performOp('*');
        break;
        case 'negative':
        let str = lowerDisplay.textContent;
        if (str.charAt(0) === "-") { lowerDisplay.textContent = str.slice(1); }
        else if (lowerDisplay.textContent.length < 13) { lowerDisplay.textContent = "-" + lowerDisplay.textContent; }
        break;
        case 'three':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "3";
        break;
        case 'two':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "2";
        break;
        case 'one':
        if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += "1";
        break;
        case 'subtract':
        performOp('-');
        break;
        case 'percent':
        handlePercent(upperDisplay,lowerDisplay);
        break;
        case 'zero':
        if ((lowerDisplay.textContent.length < 13) && (lowerDisplay.textContent.length > 0)) lowerDisplay.textContent += "0";
        break;
        case 'decimal':
        // check if the number already has a decimal point
        if (/\./.test(lowerDisplay.textContent) === false) { 
          if (lowerDisplay.textContent.length < 13) lowerDisplay.textContent += ".";
        }
        break;
        case 'equals':
        // first check to see if there are numbers in the upper and lower displays
        if ((upperDisplay.textContent.length > 0) && (lowerDisplay.textContent.length > 0)) {
          console.log(upperDisplay.textContent + lowerDisplay.textContent);
          let operands  = getNumbersAndOperator(upperDisplay.textContent + lowerDisplay.textContent);
          console.table(operands);
          if (operands != null) {
            let result = operate(operands.operator, operands.num1, operands.num2);
            upperDisplay.textContent = result;
            lowerDisplay.textContent = "";
          }
          validateDisplays(upperDisplay,lowerDisplay);
        }
        break;
        case 'add':
        performOp('+');
        break;
        default:
        break;
      }
    });
  });
}

setupButtons();