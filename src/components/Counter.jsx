import { $count,useSignalValue, increment } from "../hooks/useCount";

export function Counter() {
  const count = useSignalValue($count);

  return (
    <div>
      <h1>Counter</h1>
      <button onClick={increment}>Increment {count}</button>
    </div>
  );
}