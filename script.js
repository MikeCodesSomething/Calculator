const add = (number1, number2) => number1 + number2;

const subtract = (number1, number2) => number1 - number2;

const multiply = (number1, number2) => number1 * number2;

const divide = (number1, number2) => {
    if(number2 == 0) return "Don't divide by 0!";
    else return number1 / number2
}
