//Initial Functions
const handleClick = function(e) {
    buttonValue = e.target.id
    if(operators.test(buttonValue)) {
        lastOperator = buttonValue;
        number2 = ""}
    if(/[.\d]+/.test(buttonValue)) {
        if(lastOperator === "") number1 += buttonValue;
        else number2 += buttonValue;
    }
    display.textContent += buttonValue;
    if (buttonValue === 'AC') {
        display.textContent = "";
        number1 = ""
        number2 = ""
        lastOperator = ""}

    else if (buttonValue === '=') {
        result = operate(Number(number1), lastOperator, Number(number2));
        display.textContent = result
        number1 = String(result)
    }
}

//script
let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button');
let number1 = ""
let number2 = ""
let lastOperator = ""
let operators = /[-x!^+\/]+/

buttons.forEach((button) => button.addEventListener('click', handleClick));

//Calculations


const add = (number1, number2) => number1 + number2;

const subtract = (number1, number2) => number1 - number2;

const multiply = (number1, number2) => number1 * number2;

const divide = (number1, number2) => {
    console.log(number1,number2)
    if(number2 == 0 || number2 == null) return "Don't divide by 0!";
    else return number1 / number2
}

const exponent = (base,power) => base ** power;

const factorial = (number) => {
    let multipliers = Array.from(Array(number).keys(), value => value += 1); //create array [1,2,...,number]
    return multipliers.reduce((total, current) => total * (current), 1);
  };

const operate = (number1, operator, number2) => {
    number2 = number2 || null; //support no number2 provided
    if(operator === '+') return add(number1, number2);
    if(operator === '-') return subtract(number1, number2);
    if(operator === 'x') return multiply(number1, number2);
    if(operator === '/') return divide(number1, number2);
    if(operator === '^') return exponent(number1, number2);
    if(operator === '!') return factorial(number1)
}

//console.log(operate(3,'-',2))

