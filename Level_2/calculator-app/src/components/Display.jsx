// Calculator App Display component
import React from "react";
import "./display.css";

const Display = ({value}) => {
    return (
        <div className="display">
            {value}
        </div>
    );
};

export default Display;