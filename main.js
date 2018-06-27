document.addEventListener('DOMContentLoaded', () => {
	document.getElementsByName('number').forEach((numberButton, i) => {
		numberButton.addEventListener('click', numberClick);
	});
	
	document.getElementsByName('operator').forEach((operatorButton, i) => {
		operatorButton.addEventListener('click', equation);
	});
	
	document.getElementById('dot').addEventListener('click', addComma);
	document.getElementById('del').addEventListener('click', deleteAll);
	document.getElementById('plusminus').addEventListener('click', reverse);
	document.getElementById('back').addEventListener('click', backspace);
	document.getElementById('result').addEventListener('click', result);
	
	show();
});

let actual = '0';
let second = '';
let operator;
let lastOperator;

let output = document.getElementById('output');

function show() {
	if (actual.length > 9) {
		document.getElementsByClassName('output')[0].style.fontSize = 9;
	}
	
	output.innerHTML = actual.replace('.', ',');
}

function numberClick() {
	if (operator != undefined && actual == second)
		actual = '';
	
	if (actual[0] == '0' && actual[1] != '.')
		actual = '' + this.value;
	else
		actual += '' + this.value;
	
	show();
}

function addComma() {
	if (!actual.includes('.'))
		actual += '.';
	
	show();
}

function deleteAll() {
	actual = '0';
	second = '';
	operator = undefined;
	lastOperator = undefined;
	
	show();
}

function reverse() {
	actual = parseFloat(actual) * -1 + '';
	show();
}

function backspace() {
	actual = actual.substring(0, actual.length - 1);
	
	if ((actual.length == 1 && actual[0] == '-') || (actual.length == 0))
		actual = '0';
	
	show();
}

function equation() {
	if (operator == undefined) {
		second = parseFloat(actual);
		// actual = '0';
	}
	
	operator = this.value;
	show();
}

function result() {
	if (operator == undefined && lastOperator != undefined) {
		calculate(lastOperator);
	}
	else {
		calculate(operator);
		lastOperator = operator;
		operator = undefined;
	}
	
	show();
}

function calculate(operator) {
	switch (operator) {
		case '/':
			if (zeroSafe())
				actual = parseFloat(second) / parseFloat(actual) + '';
			break;
		case '*':
			actual = parseFloat(second) * parseFloat(actual) + '';
			break;
		case '-':
			actual = parseFloat(second) - parseFloat(actual) + '';
			break;
		case '+':
			actual = parseFloat(second) + parseFloat(actual) + '';
			break;
	}
}

function zeroSafe() {
	if (parseFloat(actual) == 0) {
		document.getElementsByClassName('calc')[0].classList.toggle('spin');
		return false;
	}
	
	return true;
}
