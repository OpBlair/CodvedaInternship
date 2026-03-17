// Calculator App Logic component

import React, {useState} from "react";
import Display from "./Display";
import Button from "./Button";
import "./calculator.css";

const Calculator = () => {
    const [input, setInput] = useState(""); //current user input
    const [operator, setOperator] = useState("") // operator
    const [previous, setPrevious] = useState(""); // previous number before operator

    const handleClick = (value) => {
        setInput(input + value);
    };

    return (
        <div className="calculator">
            <Display value={input || "0"}></Display>
            <div className="buttons">
                <Button onClick={() => {setOperator("sin"); setPrevious(input);}} className="func">sin()</Button>
                <Button onClick={() => {setOperator("cos"); setPrevious(input);}} className="func">cos()</Button>
                <Button onClick={() => {setOperator("tan"); setPrevious(input);}} className="func">tan()</Button>             
                <Button onClick={() => {setOperator("/"); setPrevious(input);}} className="operator">/</Button>
                <Button onClick={() => handleClick("9")}>9</Button>                
                <Button onClick={() => handleClick("8")}>8</Button>
                <Button onClick={() => handleClick("7")}>7</Button>               
                <Button onClick={() => {setOperator("*"); setPrevious(input);}} className="operator">x</Button>
                <Button onClick={() => handleClick("6")}>6</Button>
                <Button onClick={() => handleClick("5")}>5</Button>
                <Button onClick={() => handleClick("4")}>4</Button>
                <Button onClick={() => {setOperator("+"); setPrevious(input);}} className="operator">+</Button>
                <Button onClick={() => handleClick("3")}>3</Button>
                <Button onClick={() => handleClick("2")}>2</Button>
                <Button onClick={() => handleClick("1")}>1</Button>
                <Button onClick={() => {setOperator("-"); setPrevious(input);}} className="operator">-</Button>
                <Button onClick={() => handleClick("0")}>0</Button>
                <Button onClick={() => handleClick(".")}>.</Button>
                <Button onClick={() => handleClick("C")}>C</Button>
                <Button onClick={() => {setOperator("="); setPrevious(input);}} className="operator">=</Button>
                
            </div>
        </div>
    );
};

export default Calculator;