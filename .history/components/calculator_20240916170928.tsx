"use client";
import React, { useState } from "react";
import { evaluate } from "mathjs"; // Import de la fonction evaluate de mathjs

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState("");

  const handleButtonClick = (value: string) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleCalculate = () => {
    try {
      setExpression(evaluate(expression).toString()); // Utilisation de mathjs pour évaluer l'expression
    } catch (error) {
      setExpression("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-green-200 rounded-lg shadow-lg p-6">
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
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["4", "5", "6", "*"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["1", "2", "3", "-"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["0", ".", "=", "+"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-2xl"
              onClick={() =>
                value === "=" ? handleCalculate() : handleButtonClick(value)
              }
            >
              {value}
            </button>
          ))}
          {/* Ajout de boutons pour les fonctions scientifiques */}
          {["sqrt", "^", "log", "sin", "cos", "tan"].map((func, index) => (
            <button
              key={index}
              className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => handleButtonClick(`${func}(`)}
            >
              {func}
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
