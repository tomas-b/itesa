import { useState, useEffect } from "react";
import { getExercises } from "../data/firestoreQueries";

const useSearch = () => {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [found, setFound] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises().then((exercises) => setExercises(exercises));
  }, []);

  const searchExercises = (e) => {
    if (e.key === "Enter") {
      setSearching(true);
      setFound(
        exercises.find(
          (exercise) => exercise.name.toLowerCase() === query.toLocaleLowerCase()
        )
      );
      setQuery("");
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  return {
    query,
    searching,
    found,
    searchExercises,
    onChange,
  };
};

export default useSearch;
