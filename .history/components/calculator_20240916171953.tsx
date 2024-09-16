"use client";
import React, { useState } from "react";
import { evaluate } from "mathjs"; // Import de mathjs pour les calculs

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [lastButton, setLastButton] = useState<string>("");

  const handleButtonClick = (value: string) => {
    if (["sqrt", "log", "sin", "cos", "tan", "^"].includes(value)) {
      // Ajoute une fonction scientifique avec une parenthèse ouvrante
      setExpression((prev) => prev + value + "(");
    } else if (value === ")") {
      // Gestion des parenthèses fermantes
      if (lastButton === "(") {
        setExpression((prev) => prev.slice(0, -1)); // Retirer '(' si vide
      }
      setExpression((prev) => prev + value);
    } else {
      // Gestion des autres boutons
      setExpression((prev) => prev + value);
    }
    setLastButton(value);
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(expression);
      setExpression(result.toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
    setLastButton("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-gray-100 rounded-lg shadow-lg p-6">
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
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["4", "5", "6", "*"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["1", "2", "3", "-"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
              onClick={() => handleButtonClick(func)}
            >
              {func}
            </button>
          ))}
          <button
            className="p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={() => handleButtonClick("(")}
          >
            (
          </button>
          <button
            className="p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={() => handleButtonClick(")")}
          >
            )
          </button>
          <button
            className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 col-span-4"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
