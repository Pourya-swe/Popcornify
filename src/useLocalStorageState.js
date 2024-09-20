import { useEffect, useState } from "react";

function useLocalStorageState(initialState, key) {
  //// Callback function only will be executed in the "Mount Phase"
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

export default useLocalStorageState;
