import { useState } from "react";

export function useIncrement(initial = 0) {
  const [value, setValue] = useState(initial);
  
  const increment = () => {
    setValue(value + 1);
  };
  const decrement = () => {
    setValue(value - 1);
  };

  return [value, increment, decrement];
}