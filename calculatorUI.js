class CalculatorUI {
    constructor(engine) {
        this.engine = engine;
        this.currentInput = '';
        this.firstNumber = null;
        this.operator = null;
        this.displayElement = document.querySelector('.display');
        this.logListElement = document.querySelector('.logList');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => this.handleNumber(button.dataset.number));
        });

        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => this.handleOperator(button.dataset.operator));
        });

        document.querySelector('.equal').addEventListener('click', () => this.handleEqual());

        document.querySelector('.delete').addEventListener('click', () => this.handleDelete());

        document.querySelector('.logButton').addEventListener('click', () => this.toggleLog());
    }

    handleNumber(number) {
        this.currentInput += number;
        this.updateDisplay(this.currentInput);
    }

    handleOperator(operator) {
        if (this.currentInput === '') return;
        this.firstNumber = parseFloat(this.currentInput);
        this.operator = operator;
        this.currentInput = '';
    }

    handleEqual() {
        if (this.currentInput === '' || this.firstNumber === null || this.operator === null) return;
        const secondNumber = parseFloat(this.currentInput);
        const result = this.engine.calculate(this.firstNumber, this.operator, secondNumber);
        this.updateDisplay(result);
        this.updateLog();
        this.reset();
    }

    handleDelete() {
        this.currentInput = '';
        this.updateDisplay('');
    }

    toggleLog() {
        this.logListElement.style.display = this.logListElement.style.display === 'none' ? 'block' : 'none';
    }

    updateDisplay(value) {
        this.displayElement.textContent = value;
    }

    updateLog() {
        this.logListElement.innerHTML = '';
        this.engine.getLog().forEach(entry => {
            const option = document.createElement('option');
            option.textContent = `${entry.firstNumber} ${entry.operator} ${entry.secondNumber} = ${entry.result}`;
            this.logListElement.appendChild(option);
        });
    }

    reset() {
        this.currentInput = '';
        this.firstNumber = null;
        this.operator = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculatorEngine = new CalculatorEngine();
    new CalculatorUI(calculatorEngine);
});
