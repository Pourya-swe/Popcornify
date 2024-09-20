import { useEffect } from "react";

function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    // Note: Each time a new movie mounts a new eventlistner is added to the document so we need cleanup the previous one.
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}

export default useKey;
