import React from "react";
import { atom, useRecoilState } from "recoil";
import { useSpring, animated as a } from "@react-spring/web";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import base from "../../base";
import S from "./styles.module.css";

export const showMenuState = atom({
  key: "showMenu",
  default: false,
});

const Menu = () => {
  let [showMenu, setShowMenu] = useRecoilState(showMenuState);

  let animation = useSpring({
    to: showMenu
      ? { opacity: 1, transform: "translateX(0%)" }
      : { opacity: 0, transform: "translateX(-100%)" },
  });

  let logOut = () => {
    setShowMenu(false);
    base.auth().signOut();
  }

  return (
    <a.div className={S.menu_wrapper} style={animation}>
      <div className={S.menu_container}>
        <div className={S.close} onClick={() => setShowMenu(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <ul onClick={() => setShowMenu(false)}>
          <li>
            <Link to="/">INICIO</Link>
          </li>
          <li>
            <Link to="/">ENTRENAMIENTO</Link>
          </li>
          <li>
            <Link to="/">SUMÁ PUNTOS</Link>
          </li>
          <li>
            <Link to="/">MI PERFIL</Link>
          </li>
        </ul>
        <div className={S.logout_wrapper}>
          <button onClick={logOut}>CERRAR SESION</button>
        </div>
      </div>
    </a.div>
  );
};

export default Menu;
