import React from "react";
import Arjs from "../../components/ArjsViewer";
import BurgerMenu from "../../components/BurgerMenu";

import s from "./style.module.css";

const Points = () => {
  return (
    <div>
      <BurgerMenu className={s.back}/>
      <div className={s.container}>
        <Arjs />
      </div>
    </div>
  );
};

export default Points;
