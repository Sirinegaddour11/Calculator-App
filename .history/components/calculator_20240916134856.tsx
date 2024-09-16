"use client";
import React, { useState } from "react";

const Calculator = () => {
  const [expression, setexpression] = useState("");
  const handleButtonClick = (value: string) => {
    setexpression((prevExpression) => prevExpression + value);
  };
  return (
    <div className="w-64 mx-auto mt-8 p-4 bg-green-200 rounded-lg shadow-lg ">
      <input
        type="text"
        className="w-full mb-4 p-2 text-xl text-right bg-white rounded-lg"
        value={expression}
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/"].map((value, index)=>
        <button key={index}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >

        </button>)}
      </div>
    </div>
  );
};

export default Calculator;
