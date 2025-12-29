import { useState, useEffect } from "react";

// This hook delays the update of a value until a specified time has passed
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the value after (delay) milliseconds
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the value changes BEFORE the timer finishes, clear the old timer!
    // This is the "reset" logic that stops the flickering.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
