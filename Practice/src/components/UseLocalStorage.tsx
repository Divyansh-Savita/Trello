import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // ✅ Get from localStorage, or use initialValue
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // ✅ Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const; // like useState but synced with localStorage
}

export default useLocalStorage;