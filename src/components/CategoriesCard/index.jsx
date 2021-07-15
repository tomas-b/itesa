import React from "react";
import { Link } from "react-router-dom";
import s from "./style.module.css"

const CategoriesCard = ({image, name}) => {
  return (
    <div className={s.card}>
      <Link to={`/categories/${name}`}>
        <div className={s.card} style={{backgroundImage: `url('${image}')`}}></div>
      </Link>
      <h4>{name}</h4>
    </div>
  );
};

export default CategoriesCard;
