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
        if (value === "." && input.includes(".")) return;

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
        if (["sin", "cos", "tan"].includes(operator)){
            setPrevious("");
        } else {
            setPrevious(input);
            setInput("");
        }
    };

    // ARITHMETIC CALCULATIONS
    const calculate = () => {
        let result = 0;
    
        const isTrig = ["sin", "cos", "tan"].includes(operator);

        // Trig Function Arithmetic
        if (isTrig) {
            const num = parseFloat(input);
            if (isNaN(num)) return;

            switch (operator) {
                
                case "sin": result = Math.sin(num * (Math.PI / 180)); break;
                case "cos": result = Math.cos(num * (Math.PI / 180)); break;
                case "tan": result = Math.tan(num * (Math.PI / 180)); break;
                default: return;   
            }

            setInput(result.toFixed(4));
            setOperator("");
            setPrevious("");
            return;
        }
        
        // Basic Arithmetic operations
        const num1 = parseFloat(previous);
        const num2 = parseFloat(input);

        if (isNaN(num1) || isNaN(num2)) return;

        switch (operator) {
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

    return (
        <div className="calculator">
            <Display
                value = { 
                    ["sin", "cos", "tan"].includes(operator) ? `${operator}(${input || ""})` :
                    previous && operator ? `${previous} ${operator} ${input || ""}` : input || "0"
                }
            ></Display>
            <div className="buttons">
                <Button onClick={() => handleOperator("sin")} className="func">sin()</Button>
                <Button onClick={() => handleOperator("cos")} className="func">cos()</Button>
                <Button onClick={() => handleOperator("tan")} className="func">tan()</Button>             
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