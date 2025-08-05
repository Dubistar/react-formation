/*
 * This file is part of the React Test project.
 * It contains a custom hook for toggling a boolean value.
 */
import { useState } from "react";

export function useToggle(initial = false){
  const [value, setValue] = useState(initial);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
}