'use strict';
let display = document.getElementsByClassName('result')[0];
let expression = "";
let history = [];

function updatedisplay() {
    display.innerText = expression;
}
function updateHistory() {
    let historyDiv = document.querySelector('.history');
    historyDiv.innerHTML = history.map(item => `<div>${item}</div>`).join('');
}
document.querySelectorAll('.button');


let buttons = document.querySelectorAll('.button');

buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        let value = event.target.dataset.value;
        if (value && value !== '=' && value !== 'C') {
            if (!['+', '-', '*', '/'].includes(expression.slice(-1)) || !['+', '-', '*', '/'].includes(value)) {
            expression += value;
            updatedisplay();
        }
        }
        if (value === '=') {
            let oldExpression = expression;
            try {
                history.push(oldExpression + ' = ' + eval(expression));
                updateHistory();
                expression = String(eval(expression));
                updatedisplay();
            } catch (error) {
                expression = "Error";
                updatedisplay();
            }
        }
        if (value === 'C') {
            expression = '';
            updatedisplay();
        }
    });
});
