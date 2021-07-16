import { useParams } from "react-router";
import React, { useEffect, useState } from "react";

import { getExercises } from "../../data/firestoreQueries";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Search from "../../components/Search";
import s from "./style.module.css";

const Categories = () => {
  let { name } = useParams();
  let [exercises, setExercises] = useState([]);

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
