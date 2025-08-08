import { useState } from "react";

export function useIncrement(initial = 0) {
  const [value, setValue] = useState(initial);

  const increment = () => {
    setValue(v => v + 1);
  };
  const decrement = () => {
    setValue(v => v - 1);
  };

  return [value, increment, decrement];
}