import { describe, it, expect } from "vitest";  
import { renderHook, act } from "@testing-library/react";
import { useIncrement } from "../hooks/useIncrement";

describe("useIncrement", () => {
  it("should use default value", () => {
    const { result } = renderHook(() => useIncrement(5));
    expect(result.current[0]).toBe(5); // Le compteur doit être 5
  });

  it("should increment the counter", () => {
    const { result } = renderHook(() => useIncrement(5));
    act(() => {
      result.current[1](); // Incrémente
    }); 
    expect(result.current[0]).toBe(6); // Le compteur doit être 6
  });

  it("should decrement the counter", () => {
    const { result } = renderHook(() => useIncrement(5));
    act(() => {
      result.current[2](); // Décrémente
    });
    expect(result.current[0]).toBe(4); // Le compteur doit être 4
  });
});
