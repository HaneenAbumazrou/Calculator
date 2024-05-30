class CalculatorEngine {
    constructor() {
        this.logArray = [];
    }

    calculate(firstNumber, operator, secondNumber) {
        let result;
        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                result = firstNumber / secondNumber;
                break;
        }
        const logEntry = {
            firstNumber,
            operator,
            secondNumber,
            result
        };
        this.logArray.push(logEntry);
        return result;
    }

    getLog() {
        return this.logArray;
    }
}
