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
let hbuttons = document.getElementById('hbutton');
function updateHistory() {
    let historyDiv = document.querySelector('.history');
    historyDiv.innerHTML = history.map(item => {
        let expr = item.split(' = ')[0];
        return `<div class="history-item" data-expression="${expr}">${item}</div>`;
    }).join('');
}
document.querySelector('.history').addEventListener('click', function(event) {
    if (event.target.classList.contains('history-item')) {
        expression = event.target.dataset.expression;
        updatedisplay();
    }
});

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
document.addEventListener('keydown', handleKeyboardInput);
function handleKeyboardInput(event) {
    const key = event.key;

    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
        if (!['+', '-', '*', '/'].includes(expression.slice(-1)) || !['+', '-', '*', '/'].includes(key)) {
            expression += key;
            updatedisplay();
        }
    } else if (key === 'Enter' || key === '=') {
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
    } else if (key === 'Backspace') {
        expression = expression.slice(0, -1);
        updatedisplay();
    } else if (key === 'Escape') {
        expression = '';
        updatedisplay();
    } else if (key.toLowerCase() === 'c') {
        expression = '';
        updatedisplay();
    } else {
        console.log('Invalid key: ' + key);
    }
}