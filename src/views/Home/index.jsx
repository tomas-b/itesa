import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth";
import { useSetRecoilState } from "recoil";

import { getCategories } from "../../data/firestoreQueries";
import { currentExerciseState } from "../Categories";
import useSearch from "../../hooks/useSearch";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Card from "../../components/Card";
import CategoriesCard from "../../components/CategoriesCard";
import s from "./style.module.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const setCurrentExercise = useSetRecoilState(currentExerciseState);
  const { query, searching, setSearching, found, searchExercises, onChange, message } =
    useSearch();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return (
    <>
      <Menu />
      <div className={s.grid_wrapper}>
        <Header className={s.header} />
        <div className={s.welcome}>
          <h2>Hola {currentUser.displayName},</h2>
          <h3>Elegí tu ejercicio de hoy</h3>
        </div>
        <div className={s.search}>
          <Search query={query} searchExercises={searchExercises} onChange={onChange} />
          {searching && (
            <div className={s.btn_wrapper}>
              <button className={s.btn} onClick={() => setSearching(false)}>
                Volver
              </button>
            </div>
          )}
        </div>
        {!searching && (
          <div>
            <div className={s.title}>
              <h3>Qué músculo querés trabajar hoy?</h3>
            </div>
            <div className={s.grid}>
              {categories.map((category, i) => {
                return <CategoriesCard key={i} {...category} />;
              })}
            </div>
          </div>
        )}
        {searching && (
          <div className={s.search_results_container}>
            {message ? (
              message
            ) : (
              <Card setCurrentExercise={setCurrentExercise} exercise={found} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
