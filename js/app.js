// The data-* attribute gives us the ability to embed custom data attributes on all HTML elements. The stored (custom) data can then be used in the page's JavaScript to create a more engaging user experience (without any Ajax calls or server-side database queries).

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
//prevOperand, currentOperand and operation are all the properties of the class

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

	//convert to string to be able to use String.slice method. start form 0 index to last but one. so the current operand keeps the slice from 0 to last but one any time u click del leaving the final one out
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	//convert to string jus in case its a number so as to append/concatenate to the end of already typed numbers.
	//check to see if the numbers have a period. you only want the user to enter one period
	appendNumber(num) {
		if (num === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + num.toString();
	}

	//this.operation property of the class is = to operation parameter. after you have set the operation (sign) to the property, set the currentOperand property to the prevOperand property as well and clear the current operand. to display it go to update fxn

	//if the user doesnt enter any current text and click on the sign return....(it doent do anything) and the prev text still displays
	//also if the prev operand is not empty then compute. so regardless of if you click th = or any sign it computes
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
		this.operation = undefined; //undefined means it doesnt have a value
		this.prevOperand = "";
	}

	//we want the commas in our long numbers. use it in the update output below
	//to locale string is an inbuilt formater
	formatNumber(num) {
		const stringNum = num.toString(); //just making sure its a string before spliting into array by "." and taking the array index 0 which is the integer before the decimal or "."

		const integerNums = parseFloat(stringNum.split(".")[0]);
		const decimalNums = stringNum.split(".")[1];
		let integerDisplay;
		if (isNaN(integerNums)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerNums.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
			//makeing sure there are no decimal places after the integer display
		}

		if (decimalNums != null) {
			//this means the user enter decimals. in that case separate the integr.decimal else just return only the decimals
			return `${integerDisplay}.${decimalNums}`;
		} else {
			return integerDisplay;
		}

		// const floatNum = parseFloat(num);
		// if (isNaN(floatNum)) return "";
		// return floatNum.toLocaleString("en");
	}

	//we also want to diplay the operation sign
	updateOutput() {
		this.currentOperationText.innerHTML = this.formatNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.prevOperationText.innerHTML = `${this.prevOperand} ${this.operation}`;
			//do your setting/updating here after receiving the text
		} else {
			this.prevOperationText.innerHTML = "";
			//if you dont type any ops but the = or any number, then clear the prev opeation
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
