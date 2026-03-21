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

    return (
        <div className="calculator">
            <Display value = { previous && operator ? `${previous} ${operator} ${input}` : input || "0"}></Display>
            <div className="buttons">
                <Button onClick={() => handleOperator("sin")} className="func">sine</Button>
                <Button onClick={() => handleOperator("cos")} className="func">cosine</Button>
                <Button onClick={() => handleOperator("tan")} className="func">tanh</Button>             
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
                <Button className="operator">=</Button>
                
            </div>
        </div>
    );
};

export default Calculator;