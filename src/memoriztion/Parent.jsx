import React, { useCallback, useMemo, useState } from "react";
import Child from './Child'

export default function Parent() {
  const [counter, setCounter] = useState(0);
  const [notes, setNotes] = useState([]);
  
  const val = useMemo(() => {
    return calc(counter);
  }, [counter]);
  
  const fName = useMemo(() => {
    return { fName: "ali" };
  }, []);
  
  const sayHi = useCallback(() => {
    console.log("hi");
  }, []);

  function addNote() {
    setNotes([...notes, "new notes"]);
  }

  function increase() {
    setCounter(counter + 1);
  }

  function calc(num) {
    console.log("calc");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += num;
    }
    return sum;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parent Component</h1>
      <h2>val : {val}</h2>
      <h2>counter: {counter}</h2>
      <button 
        onClick={increase}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        +
      </button>
      <button 
        onClick={addNote}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        add note
      </button>
      <ul className="mt-4">
        {notes.map((ele, index) => (
          <li key={index} className="p-2">{ele}</li>
        ))}
      </ul>
      <Child fname={fName} sayHi={sayHi} />
    </div>
  );
}
