import { useParams } from "react-router";
import React, { useEffect } from "react";
import { atom, useSetRecoilState, useRecoilState } from "recoil";

import { getExercises } from "../../data/firestoreQueries";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Search from "../../components/Search";
import s from "./style.module.css";

export const currentExerciseState = atom({
  key: "currentExerciseState",
  default: {},
});

export const exercisesState = atom({
  key: "exercisesState",
  default: [],
});

const Categories = () => {
  const setCurrentExercise = useSetRecoilState(currentExerciseState);
  const [exercises, setExercises] = useRecoilState(exercisesState);
  console.log("exercises", exercises);

  let { name } = useParams();

  useEffect(() => {
    getExercises().then((exercises) => {
      setExercises(exercises);
    });
  }, []);

  return (
    <>
      <Menu />
      <div className={s.grid_wrapper}>
        <Header className={s.header} />
        <div className={s.search}>
          <Search />
        </div>
        <div className={s.title}>
          <h2>Descubre todos los ejercicios de {name}</h2>
        </div>
        <div className={s.grid}>
          <div className={s.carroussel}>
            {exercises.map((exercise, index) => (
              <div key={index} className={s.item}>
                <Card exercise={exercise} setCurrentExercise={setCurrentExercise} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
