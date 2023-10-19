// DOM elements
const screenTextElement = document.querySelector('#screen-text');
const operationTextElement = document.querySelector('#operation-text')
const buttonElements = document.querySelectorAll('.button');

// Global variables
let screenText = '0';
let operationText = '';
let operand1 = null;
let operand2 = null;
let operation = null;
let result = null;

// Function that resets the calculator
function resetCalculator() {
    screenText = '0';
    operationText = '';
    operand1 = null;
    operand2 = null;
    operation = null;
    result = null;
    screenTextElement.textContent = screenText;
    operationTextElement.textContent = operationText;
}

function handleDigitClick(button) {
    // If the screen text starts with '0', then it resets the screen text variable upon digit click
    if (screenText === '0') {
        screenText = '';
    }

    // Limit screen text length at 15 characters
    if (screenText.length < 16) {
        screenText += button.textContent;
        screenTextElement.textContent = screenText;
    }
}

function handleEqualClick() {
    operand2 = parseInt(screenText);
    switch(operation) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        default:
            'Invalid operation!';
    }
    operand1 = result;
    screenTextElement.textContent = result;
    operationTextElement.textContent += operand2;
}

function handleAllClearClick() {
    resetCalculator();
}

function handleClearClick() {
    screenText = screenText.slice(0, screenText.length - 1);
    screenTextElement.textContent = screenText;
}

// Get all the buttons of the calculator
for (let button of buttonElements) {

    // Add event listeners to all the buttons
    button.addEventListener('click', () => {
        if (!button.classList.contains('operator')) {

            // If user presses on a digit button
            if (button.id !== 'ac' && button.id !== 'c' && button.id !== 'dot' && button.id !== 'equal') {
                handleDigitClick(button);
            }

            // Else if user presses on either the 'C', '.' or '=' buttons 
            else {
                switch(button.id) {
                    case 'ac':
                        handleAllClearClick();
                        break;
                    case 'c':
                        handleClearClick();
                        break;
                    case 'equal':
                        handleEqualClick();
                        break;
                    default: 
                        'Invalid operation!';
                }
            }
        }

        // If user presses on an operator button
        else if (button.classList.contains('operator')) {
            if (screenText !== '') {
                operand1 = parseInt(screenText);
                operationText += operand1 + ' ' + button.textContent + ' ';
                operationTextElement.textContent = operationText;
                screenText = '';
                operation = button.textContent;
            }
            if (result) {
                operand1 = result;
                operationTextElement.textContent = `${operand1} ${operation} `;
            }
        }
    });
}
