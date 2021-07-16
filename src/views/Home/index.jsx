import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth";

import { getCategories } from "../../data/firestoreQueries";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Search from "../../components/Search";
import CategoriesCard from "../../components/CategoriesCard";
import s from "./style.module.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
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
          <Search />
        </div>
        <div className={s.title}>
          <h3>Qué músculo querés trabajar hoy?</h3>
        </div>
        <div className={s.grid}>
          {categories.map((category, i) => {
            return <CategoriesCard key={i} {...category} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
