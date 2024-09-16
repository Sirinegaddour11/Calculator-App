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
    // ... (le reste du code handleButtonClick reste inchangé)
  };

  const handleCalculate = () => {
    // ... (le reste du code handleCalculate reste inchangé)
  };

  const handleClear = () => {
    // ... (le reste du code handleClear reste inchangé)
  };

  const toggleTheme = () => {
    // ... (le reste du code toggleTheme reste inchangé)
  };

  const toggleHistory = () => {
    // ... (le reste du code toggleHistory reste inchangé)
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`flex min-h-screen bg-${theme === "light" ? "gray-100" : "gray-800"} font-sans`}>
      <div className={`w-64 bg-${theme === "light" ? "white" : "gray-700"} p-4 shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>Modèles de calculatrice</h2>
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
      <div className={`flex-grow flex justify-center items-center ${layout === "plein écran" ? "p-4" : ""}`}>
        <div
          className={`${
            layout === "vertical"
              ? "max-w-md w-full"
              : layout === "horizontal"
              ? "max-w-4xl w-full"
              : "w-full h-full"
          } bg-${theme === "light" ? "white" : "gray-700"} rounded-xl shadow-lg p-6`}
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
          <div className={`grid ${layout === "horizontal" ? "grid-cols-10" : "grid-cols-5"} gap-2`}>
            {/* ... (le reste du code pour les boutons reste inchangé) */}
          </div>
          <button
            className={`mt-4 w-full p-3 ${
              theme === "light"
                ? "bg-blue-500 text-white"
                : "bg-blue-700 text-white"
            } rounded-lg hover:bg-blue-600 text-xl font-bold transition-colors`}
            onClick={handleCalculate}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
