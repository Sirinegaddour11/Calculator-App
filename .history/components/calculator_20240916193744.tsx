"use client";
import React, { useState, useEffect } from "react";
import {
  evaluate,
  pi,
  exp,
  log,
  factorial,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
} from "mathjs";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [lastResult, setLastResult] = useState<string>("");
  const [isRadianMode, setIsRadianMode] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>("light");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "pi":
        setExpression((prev) => prev + "π");
        break;
      case "e":
        setExpression((prev) => prev + "e");
        break;
      case "Ans":
        setExpression((prev) => prev + lastResult);
        break;
      case "ln":
        setExpression((prev) => prev + "log(");
        break;
      case "log":
        setExpression((prev) => prev + "log10(");
        break;
      case "x!":
        setExpression((prev) => prev + "factorial(");
        break;
      case "%":
        setExpression((prev) => prev + "%");
        break;
      case "inv":
        setExpression((prev) => prev + "^(-1)");
        break;
      case "EXP":
        setExpression((prev) => prev + "×10^");
        break;
      case "CE":
        setExpression((prev) => prev.slice(0, -1));
        break;
      case "x²":
        setExpression((prev) => prev + "^2");
        break;
      case "x³":
        setExpression((prev) => prev + "^3");
        break;
      case "√":
        setExpression((prev) => prev + "sqrt(");
        break;
      case "∛":
        setExpression((prev) => prev + "cbrt(");
        break;
      case "sin⁻¹":
        setExpression((prev) => prev + "asin(");
        break;
      case "cos⁻¹":
        setExpression((prev) => prev + "acos(");
        break;
      case "tan⁻¹":
        setExpression((prev) => prev + "atan(");
        break;
      case "Rad":
        setIsRadianMode(true);
        break;
      case "Deg":
        setIsRadianMode(false);
        break;
      case ".":
        setExpression((prev) => (prev === "" || prev.endsWith("(") ? prev + "0." : prev + "."));
        break;
      default:
        if (["sin", "cos", "tan", "^"].includes(value)) {
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
      let expressionToEvaluate = expression
        .replace(/π/g, "pi")
        .replace(/×/g, "*");
      if (!isRadianMode) {
        expressionToEvaluate = expressionToEvaluate
          .replace(/sin\(/g, "sin(pi/180*")
          .replace(/cos\(/g, "cos(pi/180*")
          .replace(/tan\(/g, "tan(pi/180*")
          .replace(/asin\(/g, "180/pi*asin(")
          .replace(/acos\(/g, "180/pi*acos(")
          .replace(/atan\(/g, "180/pi*atan(");
      }
      const result = evaluate(expressionToEvaluate);
      setLastResult(result.toString());
      setExpression(result.toString());
      setHistory((prev) => [expression + " = " + result.toString(), ...prev.slice(0, 4)]);
    } catch (error) {
      setExpression("Erreur");
    }
  };

  const handleClear = () => {
    setExpression("");
    setLastResult("");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`flex justify-center items-center min-h-screen bg-${theme === "light" ? "gray-100" : "gray-800"} font-sans`}>
      <div className={`max-w-md w-full bg-${theme === "light" ? "white" : "gray-700"} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between mb-4">
          <button
            className={`p-2 rounded-lg ${theme === "light" ? "bg-gray-200 text-gray-700" : "bg-gray-600 text-white"}`}
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            className={`p-2 rounded-lg ${theme === "light" ? "bg-gray-200 text-gray-700" : "bg-gray-600 text-white"}`}
            onClick={toggleHistory}
          >
            📜
          </button>
        </div>
        <input
          type="text"
          className={`w-full mb-4 p-3 text-2xl text-right ${theme === "light" ? "bg-gray-50 text-gray-700" : "bg-gray-600 text-white"} rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500`}
          value={expression}
          readOnly
        />
        {showHistory && (
          <div className={`mb-4 p-2 ${theme === "light" ? "bg-gray-100" : "bg-gray-600"} rounded-lg`}>
            <h3 className={`text-lg font-bold ${theme === "light" ? "text-gray-700" : "text-white"}`}>Historique</h3>
            <ul>
              {history.map((item, index) => (
                <li key={index} className={`${theme === "light" ? "text-gray-600" : "text-gray-200"}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid grid-cols-5 gap-2">
          {/* Ligne 1 */}
          {["(", ")", "%", "CE", "AC"].map((value, index) => (
            <button
              key={index}
              className={`p-3 ${theme === "light" ? "bg-gray-200 text-gray-700" : "bg-gray-600 text-white"} rounded-lg hover:bg-gray-300 text-lg font-medium transition-colors`}
              onClick={() =>
                value === "AC" ? handleClear() : handleButtonClick(value)
              }
            >
              {value}
            </button>
          ))}
          {/* Ligne 2 */}
          {["x!", "inv", "sin", "ln", "π"].map((value, index) => (
            <button
              key={index}
              className={`p-3 ${theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-700 text-white"} rounded-lg hover:bg-blue-200 text-lg font-medium transition-colors`}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {/* Ligne 3 */}
          {["7", "8", "9", "/", "x²"].map((value, index) => (
            <button
              key={index}
              className={`p-3 ${
                isNaN(Number(value))
                  ? theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-700 text-white"
                  : theme === "light" ? "bg-white text-gray-700" : "bg-gray-700 text-white"
              } rounded-lg hover:bg-gray-100 text-lg font-medium transition-colors`}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {/* Ligne 4 */}
          {["4", "5", "6", "*", "x³"].map((value, index) => (
            <button
              key={index}
              className={`p-3 ${
                isNaN(Number(value))
                  ? theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-700 text-white"
                  : theme === "light" ? "bg-white text-gray-700" : "bg-gray-700 text-white"
              } rounded-lg hover:bg-gray-100 text-lg font-medium transition-colors`}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {/* Ligne 5 */}
          {["1", "2", "3", "-", "√"].map((value, index) => (
            <button
              key={index}
              className={`p-3 ${
                isNaN(Number(value))
                  ? theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-700 text-white"
                  : theme === "light" ? "bg-white text-gray-700" : "bg-gray-700 text-white"
              } rounded-lg hover:bg-gray-100 text-lg font-medium transition-colors`}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {/* Ligne 6 */}
          {["0", ".", "EXP", "+", "∛"].map((value, index) => (
            <button
              key={index}
              className={`p-3 ${
                isNaN(Number(value))
                  ? theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-700 text-white"
                  : theme === "light" ? "bg-white text-gray-700" : "bg-gray-700 text-white"
              } rounded-lg hover:bg-gray-100 text-lg font-medium transition-colors`}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
          {/* Ligne 7 (fonctions scientifiques) */}
          {["cos", "tan", "Ans", "e", "log"].map((func, index) => (
            <button
              key={index}
              className={`p-3 ${theme === "light" ? "bg-green-100 text-green-700" : "bg-green-700 text-white"} rounded-lg hover:bg-green-200 text-lg font-medium transition-colors`}
              onClick={() => handleButtonClick(func)}
            >
              {func}
            </button>
          ))}
          {/* Ligne 8 (fonctions supplémentaires) */}
          {["sin⁻¹", "cos⁻¹", "tan⁻¹", "Rad", "Deg"].map((func, index) => (
            <button
              key={index}
              className={`p-3 ${
                (func === "Rad" && isRadianMode) ||
                (func === "Deg" && !isRadianMode)
                  ? theme === "light" ? "bg-yellow-200 text-yellow-700" : "bg-yellow-600 text-white"
                  : theme === "light" ? "bg-gray-200 text-gray-700" : "bg-gray-600 text-white"
              } rounded-lg hover:bg-gray-300 text-lg font-medium transition-colors`}
              onClick={() => handleButtonClick(func)}
            >
              {func}
            </button>
          ))}
        </div>
        <button
          className={`mt-4 w-full p-3 ${theme === "light" ? "bg-blue-500 text-white" : "bg-blue-700 text-white"} rounded-lg hover:bg-blue-600 text-xl font-bold transition-colors`}
          onClick={handleCalculate}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
