/*=====================
 retrieve element
======================*/
const operationBtns = document.querySelectorAll("[data-operation]");
const numberBtns = document.querySelectorAll("[data-number]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const prevOperationText = document.querySelector("[data-prev-operation]");
const currentOperationText = document.querySelector("[data-current-operation]");
const allClearBtn = document.querySelector("[data-all-clear]");

/*=====================
  create a class/blueprint of a calculator. which will state all functionalities/methods
======================*/

class Calculator {
	constructor(prevOperationText, currentOperationText) {
		this.prevOperationText = prevOperationText;
		this.currentOperationText = currentOperationText;
		this.clear();
		//as soon as you create a new calculator you want to clear the fxn and set to default
	}

	//the AC buttons clears the output an sets operation to undefined
	clear() {
		this.prevOperand = "";
		this.currentOperand = "";
		this.operation = undefined;
	}

	//convert to string to be able to use String.slice method.
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	//check to see if the numbers have a period. you only want the user to enter one period
	appendNumber(num) {
		if (num === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + num.toString();
	}


	//if the user doesnt enter any current text and click on the = sign, return.
	//also if the prev operand is not empty then compute. 
	operationSign(operation) {
		if (this.currentOperand === "") return;

		if (this.prevOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.prevOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let result;
		const previous = parseFloat(this.prevOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(previous) || isNaN(current)) return;

		switch (this.operation) {
			case "/":
				result = previous / current;
				break;

			case "*":
				result = previous * current;
				break;

			case "+":
				result = previous + current;
				break;

			case "-":
				result = previous - current;
				break;

			default:
				return; //we no match we dont want to do any computation
		}

		//the current operand is the result
		this.currentOperand = result;
		this.operation = undefined;
		this.prevOperand = "";
	}

	//we want the commas in our long numbers. use it in the update output below
	//to locale string is an inbuilt formater
	formatNumber(num) {
		const stringNum = num.toString(); 

		const integerNums = parseFloat(stringNum.split(".")[0]);
		const decimalNums = stringNum.split(".")[1];
		let integerDisplay;
		if (isNaN(integerNums)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerNums.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
			
		}

		if (decimalNums != null) {
			//this means the user enter decimals. in that case separate the integer.decimal else just return only the decimals
			return `${integerDisplay}.${decimalNums}`;
		} else {
			return integerDisplay;
		}

	}

	updateOutput() {
		this.currentOperationText.innerHTML = this.formatNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.prevOperationText.innerHTML = `${this.prevOperand} ${this.operation}`;
			
		} else {
			this.prevOperationText.innerHTML = "";
			
		}
	}
}

/*=====================
  create a calculator object and write function for number buttons
======================*/
const calculator = new Calculator(prevOperationText, currentOperationText);

//for each elements (buttons) if you click on a button add the button innerhtml to the append number fxn
numberBtns.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerHTML);
		calculator.updateOutput();
	});
});

/*=====================
  operation sign buttons
======================*/
//for each elements (buttons) if you click on a button add the button innerhtml to the operation sign fxn
operationBtns.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.operationSign(button.innerHTML);
		calculator.updateOutput();
	});
});

/*=====================
  eual to sign
======================*/
//all the = does is to compute and update
equalsBtn.addEventListener("click", () => {
	calculator.compute();
	calculator.updateOutput();
});

/*=====================
 all clear button
======================*/
//all the  AC btn does is to clear and update
allClearBtn.addEventListener("click", () => {
	calculator.clear();
	calculator.updateOutput();
});

/*=====================
delete button
======================*/
//all the = does is to compute and update
deleteBtn.addEventListener("click", () => {
	calculator.delete();
	calculator.updateOutput();
});
