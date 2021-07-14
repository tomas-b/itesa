import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth";
import base from "../../base";
import { useRecoilState } from "recoil";
import Menu, { showMenuState } from "../../components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import s from "./style.module.css";

const Home = () => {
  let [showMenu, setShowMenu] = useRecoilState(showMenuState);
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

  return (
    <>
      <Menu />
      <h1>hi, {user.displayName}!</h1>
      <h2> {gender} </h2>
      <FontAwesomeIcon
        className={s.icon}
        icon={faBars}
        onClick={() => setShowMenu(true)}
      />
      <input type="text" placeholder="Buscá tu ejercicio" />
      <div className={s.grid}>
        <div className={s.card}>
          <div></div>
          <h4>Ejercicio</h4>
        </div>
        <div className={s.card}>
          <div></div>
          <h4>Ejercicio</h4>
        </div>
        <div className={s.card}>
          <div></div>
          <h4>Ejercicio</h4>
        </div>
        <div className={s.card}>
          <div></div>
          <h4>Ejercicio</h4>
        </div>
      </div>
    </>
  );
};

export default Home;
