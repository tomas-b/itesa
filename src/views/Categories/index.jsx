import { useParams } from "react-router";
import React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Search from "../../components/Search";
import { useRecoilState } from 'recoil';
import { exercisesState } from "../../data/exercises.js"

import s from "./style.module.css";

const Categories = () => {
  let { name } = useParams();
  let [exercises, setExercises] = useRecoilState(exercisesState)

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
            {exercises.map((exercise) => (
              <div className={s.item}>
                <Card {...exercise} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
