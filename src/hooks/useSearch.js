import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { exercisesState } from "../views/Categories";
import { getExercises } from "../data/firestoreQueries";

const useSearch = () => {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [found, setFound] = useState({});
  const [message, setMessage] = useState("");
  const [exercises, setExercises] = useRecoilState(exercisesState);

  useEffect(() => {
    getExercises().then((exercises) => setExercises(exercises));
  }, []);

  const searchExercises = (e) => {
    if (e.key === "Enter") {
      setSearching(true);
      if (query === "") {
        setMessage("No se encontro ningun ejercicio");
      } else {
        const found_exercise = exercises.find((exercise) => {
          return exercise.name.toLowerCase().includes(query.toLocaleLowerCase());
        });

        if (found_exercise) setFound(found_exercise);
        else setMessage("No se encontro ningun ejercicio");
        setQuery("");
      }
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  return {
    query,
    searching,
    setSearching,
    found,
    searchExercises,
    onChange,
    message,
  };
};

export default useSearch;
