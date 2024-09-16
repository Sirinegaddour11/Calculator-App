"use client";
import React, { useState } from "react";
import { evaluate, pi, exp, ln, factorial } from "mathjs";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
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
      case "ln":
        setExpression((prev) => prev + "ln(");
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
      default:
        if (["sqrt", "log", "sin", "cos", "tan", "^"].includes(value)) {
          setExpression((prev) => prev + value + "(");
        } else if (value === ")") {
          setExpression((prev) => prev + value);
        } else {
          setExpression((prev) => prev + value);
        }
        break;
    }
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
    setLastResult("");
  };

  return (
    <div className="flex justify-center items-center min-w-[50vh] p-8 bg-gray-100">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <input
          type="text"
          className="w-full mb-4 p-3 text-2xl text-right bg-gray-200 rounded-lg"
          value={expression}
          readOnly
        />
        <div className="grid grid-cols-5 gap-2">
          {/* Ligne 6 (fonctions supplémentaires) */}
          <div className="grid grid-">
            {["pi", "e", "ln", "Ans", "EXP", "Rad", "Deg", "inv"].map(
              (func, index) => (
                <button
                  key={index}
                  className="p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xl"
                  onClick={() => handleButtonClick(func)}
                >
                  {func}
                </button>
              )
            )}
          </div>
          {/* Ligne 1 */}
          {["7", "8", "9", "/", "CE"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
              onClick={() =>
                value === "CE"
                  ? handleButtonClick(value)
                  : handleButtonClick(value)
              }
            >
              {value}
            </button>
          ))}
          {/* Ligne 2 */}
          {["4", "5", "6", "*", "x²"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {/* Ligne 3 */}
          {["1", "2", "3", "-", "x!"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {/* Ligne 4 */}
          {["0", ".", "=", "+", "%"].map((value, index) => (
            <button
              key={index}
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
              onClick={() =>
                value === "=" ? handleCalculate() : handleButtonClick(value)
              }
            >
              {value}
            </button>
          ))}
          {/* Ligne 5 (fonctions scientifiques) */}
          {["sqrt", "log", "sin", "cos", "tan"].map((func, index) => (
            <button
              key={index}
              className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl"
              onClick={() => handleButtonClick(func)}
            >
              {func}
            </button>
          ))}
        </div>
        <button
          className="mt-4 w-full p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;
