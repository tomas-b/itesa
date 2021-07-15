import React from "react";
import { Link } from 'react-router-dom';
import s from "./style.module.css"

const Card = ({id, name, needs, image}) => {
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
      <Link to={`/tutorial/${id}`} className={s.btn}>
        Tutorial
      </Link>
      </div>
    </div>
  );

}

export default Card;
