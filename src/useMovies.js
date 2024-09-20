import { useState, useEffect } from "react";

const KEY = "de3eae78";

// function useMovies(query, callback) {
function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    //// Calling the callback function if it exists
    // callback?.();

    //// It's native browser API
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        //// Reseting the error to see results of search query
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        const data = await res.json();

        //// Incase there was not internet connection
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies.");

        //// Incase Query was not something meaningful
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    //// Checking if ther query is less than 3 characters then we do not want ot send any request(it actually fix race condition as well)
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

export default useMovies;
