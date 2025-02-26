import { createContext, useState } from "react";

export const counterContext = createContext();

export default function CounterContextProvider({ children }) {
  const [cartNum, setCartNums] = useState(0);

  return (
    <counterContext.Provider value={{ cartNum, setCartNums}}>
      {children}
    </counterContext.Provider>
  );
}
