// calculator public variables
let displayValue = "";
let prevNum1 = 0;
let prevNum2 = 0;
let prevNum3 = 0;
let currentOperation = "";

// calculator basic functions:
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 == 0) 
  {
    return "Cannot divide by 0!"
  }
  else 
  {
    return num1 / num2;
  }
}

// calculator executes this when equals is clicked
function operate(operation, num1, num2) {
  switch(operation) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "ERROR!!!";
  }
}
function isNumeric(num){
  return !isNaN(num)
}

// nodelist of all calculator buttons
const allCalButtons = document.querySelectorAll("div button.cal-btn");

function setupCalNumberButtons() {

  let numberCalButtons = 
    Array.from(allCalButtons)
      .filter(btn => isNumeric(btn.textContent))

  numberCalButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {

      if (isNumeric(displayValue) && displayValue.length < 15) 
      {
        updateDisplayValue(displayValue += e.target.textContent);
      }
      else if (isNumeric(displayValue) && displayValue.length == 15) 
      {
        // do nothing
      }
      else if (!isNumeric(displayValue))
      {
        clearAll();
        updateDisplayValue(e.target.textContent);
      }
        
    });
  });
    
}

function setupCalOperationButtons() {

  let notNumberCalButtons = 
    Array.from(allCalButtons)
      .filter(btn => !isNumeric(btn.textContent))

  notNumberCalButtons.forEach(btn => {
      
    if (btn.classList.contains("equals")) 
    {
      btn.addEventListener("click", (e) => {
        if (prevNum2 == 0) {

          prevNum2 = parseFloat(displayValue);

          prevNum3 = operate(currentOperation, prevNum1, prevNum2);

          updateDisplayValue(String(prevNum3));

        }
          
      });
    }
    else if (btn.classList.contains("clear")) 
    {
      btn.addEventListener("click", clearAll);
    }
    else if (btn.classList.contains("dot")) 
    {
      btn.addEventListener("click", (e) => {

        if (!displayValue.includes(".")) {
          updateDisplayValue(displayValue + ".");
        }

      });
    }
    else // add, minus, multipy and divide buttons
    {
      btn.addEventListener("click", (e) => {
        if (prevNum1 == 0 && prevNum2 == 0 && prevNum3 == 0) {
          prevNum1 = parseFloat(displayValue)
        } else if (prevNum1 != 0 && prevNum3 == 0) {
          prevNum2 = parseFloat(displayValue)
          prevNum3 = operate(currentOperation, prevNum1, prevNum2);
          prevNum1 = prevNum3;
          prevNum2 = 0;
          prevNum3 = 0;
        } else if (prevNum1 != 0 && prevNum2 != 0 && prevNum3 != 0) {
          prevNum1 = prevNum3
          prevNum2 = 0;
          prevNum3 = 0;
        }
        clearDisplay();
        currentOperation = e.target.textContent;
      });
    }
  });
    
}

const displayValueObj = document.querySelector("#cal-display-value");

// ==========
// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input?rq=1
// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) 
{
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) 
  {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}
setInputFilter(displayValueObj, function(value) {
return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});
// ==========

function updateDisplayValue(newValue) {
  displayValue = newValue;
  displayValueObj.value = newValue;
}

function clearDisplay() {
  updateDisplayValue("");
}

function clearAll() {
  prevNum1 = 0;
  prevNum2 = 0;
  prevNum3 = 0;
  currentOperation = "";
  clearDisplay();
}

function peak() {
  
  /*
  let displayValue = "";
  let prevNum1 = 0;
  let prevNum2 = 0;
  let prevNum3 = 0;
  let currentOperation = "";
  */

  console.log(`displayValue: ${displayValue}`);
  console.log(`prevNum1: ${prevNum1}`);
  console.log(`prevNum2: ${prevNum2}`);
  console.log(`prevNum3: ${prevNum3}`);
  console.log(`currentOperation: ${currentOperation}`);

}

// --- main --- //
function start() {
  setupCalNumberButtons();
  setupCalOperationButtons();
  clearDisplay();
  // Ready
}
start();