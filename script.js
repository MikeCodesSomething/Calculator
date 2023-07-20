//Initial Functions
const handleClick = function(e) {
    buttonValue = e.target.id

    if (buttonValue === 'AC') {
        display.textContent = "";
        equation = [];
        return;
    }

    if (buttonValue === '=') {
        console.log(...equation);
        result = evaluate(equation);
        display.textContent = result
        return;
    }

    if(operatorRegex.test(buttonValue)) {
        equation.push(buttonValue);
        buttonValue = ' '+buttonValue+' '
    }
    if(numberRegex.test(buttonValue)) {
        if(numberRegex.test(equation[equation.length-1])){
            equation[equation.length-1] += buttonValue; 
        }      
        else equation.push(buttonValue); 
    }
    display.textContent += buttonValue;

}

//script
let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button');
let operatorRegex = /[-x!^+\/]+/;
let numberRegex = /[.\d]+/
let equation = [];

buttons.forEach((button) => button.addEventListener('click', handleClick));

//Calculations


const add = (number1, number2) => Number(number1) + Number(number2);

const subtract = (number1, number2) => Number(number1) - Number(number2);

const multiply = (number1, number2) => number1 * number2;

const divide = (number1, number2) => {
    if(number2 == 0 || number2 == null) return "Don't divide by 0!";
    else return number1 / number2
}

const exponent = (base,power) => base ** power;

const factorial = (number) => {
	let total = 1
  for (i = number; i > 1; i--) {
    total *= i
  }
  return total
};

const operate = (number1, operator, number2) => {
    console.log(number1, operator, number2)
    number1 = number1 || null; //support no number1 provided
    number2 = number2 || null; //support no number2 provided
    operator = operator || null; //support no operator provided
    if(number1 === null) return '0';
    if(operator === '+') return add(number1, number2);
    if(operator === '-') return subtract(number1, number2);
    if(operator === 'x') return multiply(number1, number2);
    if(operator === '/') return divide(number1, number2);
    if(operator === '^') return exponent(number1, number2);
    if(operator === '!') return factorial(number1);
    if(operator === null) return number1;
}

const evaluate = (equation) => {
    if (equation.length <= 1) {
        //console.log(`only ${equation.length} arguments: ${equation} time to return`)
        return equation[0];
    }
    //If there's more than 1 value, we can simplify by using BIDMAS
    if (equation.indexOf('^') != -1) { //indices first bIdmas
        simplifyEquation(equation.indexOf('^')); // replaces the operation with it's result
        return evaluate(equation);
    }
    if (equation.indexOf('/') != -1) { //divide next biDmas
        simplifyEquation(equation.indexOf('/')); 
        return evaluate(equation);
    }    
    if (equation.indexOf('x') != -1) { //multiply next bidMas
        simplifyEquation(equation.indexOf('x'));
        return evaluate(equation);
    }
    if (equation.indexOf('!') != -1) { //factorial next bidMas (it's a multiply)
        simplifyEquation(equation.indexOf('!'));
        return evaluate(equation);
    }
    if (equation.indexOf('+') != -1) { //add next bidmAs 
        simplifyEquation(equation.indexOf('+')); 
        return evaluate(equation);
    }
    if (equation.indexOf('-') != -1) { //subtract last bidmaS 
        simplifyEquation(equation.indexOf('-')); 
        return evaluate(equation);
    }
    
}

const simplifyEquation = (index) => {
    console.log(equation);
    let operator = equation[index];
    let number1 = equation[index - 1];
    let number2 = equation[index + 1];
    //delete and use 2 values if we're doing factorial, 3 otherwise
    if (operator === '!') {
        let operationResult = operate(number1, operator);
        equation.splice(index-1, 2, String(operationResult));
    } 
    else {
        let operationResult = operate(number1, operator, number2)
        equation.splice(index-1, 3, String(operationResult));
    }
    console.log(equation);
}


