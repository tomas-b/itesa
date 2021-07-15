import React from "react";
import s from "./style.module.css"

const Card = ({name, needs, image}) => {
  return (
    <div className={s.card}>
      <div className={s.title}>{name}</div>
      <div className={s.features}>
        <ul>
          <li>Necesitas...</li>
          <li>{needs.join(', ')}</li>
        </ul>
      </div>
      <div
        className={s.image}
        style={{backgroundImage: `url('${image}')`}}
      ></div>
      <div className={s.btn_wrapper}>
      <a href="https://www.youtube.com/watch?v=iGYeHsgb4CY&ab_channel=ATHLEAN-X%E2%84%A2" className={s.btn}>
        Tutorial
      </a>
      </div>
    </div>
  );

}

export default Card;
