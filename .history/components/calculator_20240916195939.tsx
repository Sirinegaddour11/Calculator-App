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
  const [layout, setLayout] = useState<string>("vertical");

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
      case "C":
        handleClear();
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
        setExpression((prev) =>
          prev === "" || prev.endsWith("(") ? prev + "0." : prev + "."
        );
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
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
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
      setHistory((prev) => [
        expression + " = " + result.toString(),
        ...prev.slice(0, 4),
      ]);
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

  const buttonLayout = [
    ["Rad", "Deg", "(", ")", "CE"],
    ["sin", "cos", "tan", "x!", "C"],
    ["sin⁻¹", "cos⁻¹", "tan⁻¹", "inv", "÷"],
    ["x²", "x³", "√", "∛", "×"],
    ["7", "8", "9", "%", "-"],
    ["4", "5", "6", "π", "+"],
    ["1", "2", "3", "e", "EXP"],
    ["0", ".", "Ans", "log", "="]
  ];

  return (
    <div
      className={`flex min-h-screen bg-${
        theme === "light" ? "gray-100" : "gray-800"
      } font-sans`}
    >
      <div
        className={`w-64 bg-${
          theme === "light" ? "white" : "gray-700"
        } p-4 shadow-lg`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Modèles de calculatrice
        </h2>
        <ul>
          {["vertical", "horizontal", "plein écran"].map((option) => (
            <li key={option} className="mb-2">
              <button
                className={`w-full p-2 rounded-lg ${
                  layout === option
                    ? theme === "light"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-700 text-white"
                    : theme === "light"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-gray-600 text-white"
                } hover:bg-blue-600 transition-colors`}
                onClick={() => setLayout(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`flex-grow flex justify-center items-center ${
          layout === "plein écran" ? "p-4" : ""
        }`}
      >
        <div
          className={`${
            layout === "vertical"
              ? "max-w-md w-full"
              : layout === "horizontal"
              ? "max-w-4xl w-full"
              : "w-full h-full"
          } bg-${
            theme === "light" ? "white" : "gray-700"
          } rounded-xl shadow-lg p-6`}
        >
          <div className="flex justify-between mb-4">
            <button
              className={`p-2 rounded-lg ${
                theme === "light"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-600 text-white"
              }`}
              onClick={toggleTheme}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              className={`p-2 rounded-lg ${
                theme === "light"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-600 text-white"
              }`}
              onClick={toggleHistory}
            >
              📜
            </button>
          </div>
          <input
            type="text"
            className={`w-full mb-4 p-3 text-2xl text-right ${
              theme === "light"
                ? "bg-gray-50 text-gray-700"
                : "bg-gray-600 text-white"
            } rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500`}
            value={expression}
            readOnly
          />
          {showHistory && (
            <div
              className={`mb-4 p-2 ${
                theme === "light" ? "bg-gray-100" : "bg-gray-600"
              } rounded-lg`}
            >
              <h3
                className={`text-lg font-bold ${
                  theme === "light" ? "text-gray-700" : "text-white"
                }`}
              >
                Historique
              </h3>
              <ul>
                {history.map((item, index) => (
                  <li
                    key={index}
                    className={`${
                      theme === "light" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div
            className={`grid ${
              layout === "horizontal" ? "grid-cols-10" : "grid-cols-5"
            } gap-2`}
          >
            {buttonLayout.map((row, rowIndex) =>
              row.map((btn, btnIndex) => (
                <button
                  key={`${rowIndex}-${btnIndex}`}
                  className={`p-2 rounded-lg ${
                    btn === "=" 
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : ["C", "CE"].includes(btn)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : ["+", "-", "×", "÷"].includes(btn)
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : theme === "light"
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-gray-600 text-white hover:bg-gray-500"
                  } transition-colors`}
                  onClick={() => btn === "=" ? handleCalculate() : handleButtonClick(btn)}
                >
                  {btn}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
