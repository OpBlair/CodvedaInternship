// Calculator App Logic component
import {useState} from "react";
import Display from "./Display";
import Button from "./Button";
import "./calculator.css";

const Calculator = () => {
    const [input, setInput] = useState(""); //current user input
    const [operator, setOperator] = useState("") // operator
    const [previous, setPrevious] = useState(""); // previous number before operator

    const handleClick = (value) => {
        if (value === "C") {
            setInput("");
            setPrevious("");
            setOperator("");
        } else {
            setInput(prev => prev + value);
        }
    };

    const handleOperator = (operator) => {
        setOperator(operator);
        setPrevious(input);
        setInput("");
    };

    // BASIC ARITHMETIC CALCULATIONS
    const calculate = () => {
        let result = 0;
        const num1 = parseFloat(previous);
        const num2 = parseFloat(input);

        if (isNaN(num1) || isNaN(num2)) return;
        switch (operator) {
            // Basic Math operations following BODMAS 
            case "/": result = num2 !== 0 ? num1 / num2 : "Can't divide by 0"; break;
            case "*": result = num1 * num2; break;
            case "+": result = num1 + num2; break;
            case "-": result = num1 - num2; break;
            default: return;
        }

        setInput(result.toString());
        setOperator("");
        setPrevious("");
    };

    // TRIGONOMETRY FUNCTION CALCULATIONS
    const handleTrigFunc = (trigFunction) => {
        const current = parseFloat(input);
        if (isNaN(current)) return;

        let result = 0;
        switch (trigFunction) {
            case "sin": result = Math.sin(current * (Math.PI / 180)).toFixed(4); break;
            case "cos": result = Math.cos(current * (Math.PI / 180)).toFixed(4); break;
            case "tan": result = Math.tan(current * (Math.PI / 180)).toFixed(4); break;
            default: return;
        }

        setInput(result.toString());
        setOperator("");
        setPrevious("");
    }

    return (
        <div className="calculator">
            <Display value = { previous && operator ? `${previous} ${operator} ${input}` : input || "0"}></Display>
            <div className="buttons">
                <Button onClick={() => handleTrigFunc("sin")} className="func">sine</Button>
                <Button onClick={() => handleTrigFunc("cos")} className="func">cosine</Button>
                <Button onClick={() => handleTrigFunc("tan")} className="func">tan</Button>             
                <Button onClick={() => handleOperator("/")} className="operator">/</Button>
                <Button onClick={() => handleClick("9")}>9</Button>                
                <Button onClick={() => handleClick("8")}>8</Button>
                <Button onClick={() => handleClick("7")}>7</Button>               
                <Button onClick={() => handleOperator("*")} className="operator">x</Button>
                <Button onClick={() => handleClick("6")}>6</Button>
                <Button onClick={() => handleClick("5")}>5</Button>
                <Button onClick={() => handleClick("4")}>4</Button>
                <Button onClick={() => handleOperator("+")} className="operator">+</Button>
                <Button onClick={() => handleClick("3")}>3</Button>
                <Button onClick={() => handleClick("2")}>2</Button>
                <Button onClick={() => handleClick("1")}>1</Button>
                <Button onClick={() => handleOperator("-")} className="operator">-</Button>
                <Button onClick={() => handleClick("0")}>0</Button>
                <Button onClick={() => handleClick(".")}>.</Button>
                <Button onClick={() => handleClick("C")}>C</Button>
                <Button onClick={calculate} className="operator">=</Button>
                
            </div>
        </div>
    );
};

export default Calculator;