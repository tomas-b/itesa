import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth";
import base from "../../base";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Search from "../../components/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import s from "./style.module.css";

const Home = () => {
  let [gender, setGender] = useState("");
  const user = useContext(AuthContext).currentUser;

  useEffect(() => {
    // base
    //   .firestore()
    //   .collection("users")
    //   .get()
    //   .then((res) => res.forEach(user=>console.log(user.data())) )

    base
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((res) => setGender(res.data().gender));
  }, []);

  // let categories = ["Biceps", "Piernas", "Abdominales", "Pecho"];
  let categories = [{name: "Biceps", imgUrl: "url"}, {name: "Piernas", imgUrl: "url"}, {name: "Abdominales", imgUrl: "url"}, {name: "Pecho", imgUrl: "url"} ];

  return (
    <>
      <Menu />
      <div className={s.grid_wrapper}>
        <Header className={s.header} />
        <div className={s.welcome}>
          <h2>Hola {user.displayName},</h2>
          <h3>Elegí tu ejercicio de hoy</h3>
        </div>
        <div className={s.search}>
          <Search />
        </div>
        <div className={s.title}>
          <h3>Qué músculo querés trabajar hoy?</h3>
        </div>
        <div className={s.grid}>
          {categories.map((category, index) => {
            return (
              <div key={index} className={s.card}>
                <Link to={`/categories/${category.name}`}>
                  <div className={s.card}>
                  </div>
                </Link>
                <h4>{category.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
