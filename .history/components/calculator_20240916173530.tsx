"use client";
import React, { useState } from "react";
import { evaluate, pi, exp, factorial } from "mathjs";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [lastButton, setLastButton] = useState<string>("");
  const [lastResult, setLastResult] = useState<string>("");

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "pi":
        setExpression((prev) => prev + pi.toString());
        break;
      case "e":
        setExpression((prev) => prev + exp(1).toString());
        break;
      case "Ans":
        setExpression((prev) => prev + lastResult);
        break;
      case "Rad":
        setExpression((prev) => prev + " Rad ");
        break;
      case "Deg":
        setExpression((prev) => prev + " Deg ");
        break;
      case "x!":
        setExpression((prev) => prev + "factorial(");
        break;
      case "%":
        setExpression((prev) => prev + "/100");
        break;
      case "inv":
        setExpression((prev) => prev + "^(-1)");
        break;
      case "EXP":
        setExpression((prev) => prev + "*10^");
        break;
      case "CE":
        setExpression((prev) => prev.slice(0, -1));
        break;
      case "x²":
        setExpression((prev) => prev + "^2");
        break;
      case "ln":
        setExpression((prev) => prev + "ln(");
        break;
      default:
        if (["sqrt", "log", "sin", "cos", "tan", "^"].includes(value)) {
          setExpression((prev) => prev + value + "(");
        } else if (value === ")") {
          if (lastButton === "(") {
            setExpression((prev) => prev.slice(0, -1)); // Retirer '(' si vide
          }
          setExpression((prev) => prev + value);
        } else {
          setExpression((prev) => prev + value);
        }
        break;
    }
    setLastButton(value);
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(expression);
      setLastResult(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
    setLastButton("");
    setLastResult("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <input
          type="text"
          className="w-full mb-4 p-3 text-2xl text-right bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={expression}
          readOnly
        />
        <div className="grid grid-cols-4 gap-3">
          {["7", "8", "9", "/"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["4", "5", "6", "*"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["1", "2", "3", "-"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {["0", ".", "=", "+"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-600 text-white rounded-lg font-bold text-2xl hover:bg-blue-700"
              onClick={() =>
                value === "=" ? handleCalculate() : handleButtonClick(value)
              }
            >
              {value}
            </button>
          ))}
          {/* Fonction scientifique enrichie */}
          {["sqrt", "^", "log", "sin", "cos", "tan"].map((func, index) => (
            <button
              key={index}
              className="p-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
              onClick={() => handleButtonClick(func)}
            >
              {func}
            </button>
          ))}
          {/* Ajout des nouveaux boutons */}
          {[
            "pi",
            "e",
            "ln",
            "Ans",
            "EXP",
            "Rad",
            "Deg",
            "x!",
            "%",
            "inv",
            "CE",
            "x²",
          ].map((func, index) => (
            <button
              key={index}
              className="p-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
              onClick={() => handleButtonClick(func)}
            >
              {func}
            </button>
          ))}
          <button
            className="p-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
            onClick={() => handleButtonClick("(")}
          >
            (
          </button>
          <button
            className="p-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
            onClick={() => handleButtonClick(")")}
          >
            )
          </button>
          <button
            className="p-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 col-span-4"
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
