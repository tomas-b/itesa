import React from "react";
import Arjs from "../../components/ArjsViewer";
import BurgerMenu from "../../components/BurgerMenu";

import s from "./style.module.css";

const Points = () => {
  return (
    <div>
      <BurgerMenu />
      <div className={s.App}>
        <div className={s.container}>
          <Arjs />
        </div>
      </div>
    </div>
  );
};

export default Points;
