"use client";
import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [expression, setexpression] = useState("");
  const handleButtonClick = (value: string) => {
    setexpression((prevExpression) => prevExpression + value);
  };
  const handleCalculate = () => {
    try {
      setexpression(eval(expression));
    } catch (error) {
      setexpression("Error");
    }
  };
  const handleClear = () => {
    setexpression("")
  }
  return (
    <div className=" ">
      <div className="w-64 mx-auto mt-8 p-4 bg-green-200 rounded-lg shadow-lg ">
        <input
          type="text"
          className="w-full mb-4 p-2 text-xl text-right bg-white rounded-lg"
          value={expression}
          readOnly
        />
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/"].map((value, index) => (
            <button
              key={index}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["4", "5", "6", "*"].map((value, index) => (
            <button
              key={index}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["1", "2", "3", "-"].map((value, index) => (
            <button
              key={index}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["0", ".", "=", "+"].map((value, index) => (
            <button
              key={index}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() =>
                value === "=" ? handleCalculate() : handleButtonClick(value)
              }
            >
              {value}
            </button>
          ))}
        </div>
        <button
          className="mt-4 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;
