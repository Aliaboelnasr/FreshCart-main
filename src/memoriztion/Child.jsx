import React, { memo } from "react";

const Child = memo(({ fname, sayHi }) => {
  console.log("child rendered");
  
  return (
    <div className="border p-4 mt-4">
      <h2>Child Component</h2>
      <p>First Name: {fname.fName}</p>
      <button 
        onClick={sayHi}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Say Hi
      </button>
    </div>
  );
});

export default Child;
