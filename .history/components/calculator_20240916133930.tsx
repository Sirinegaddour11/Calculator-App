import React, { useState } from "react";

const Calculator = () => {
    const [expression, setexpression] = useState("false")
    const handleButtonClick =(value:string)=>{}
  return (
    <div className="w-64 mx-auto mt-8 p-4 bg-green-200 rounded-lg shadow-lg ">
      <input
        type="text"
        className="w-full mb-4 p-2 text-xl text-right bg-white rounded-lg"
      value={expression}
      readOnly
      />
    </div>
  );
};

export default Calculator;
