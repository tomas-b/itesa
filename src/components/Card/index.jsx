import React from "react";
import s from "./style.module.css"

const Card = () => {
  return (
    <div className={s.card}>
      <div className={s.title}>Biseps curl</div>
      <div className={s.icon}>
        <img src="https://cdn.discordapp.com/attachments/864138362306953229/864917391837626398/unknown.png" />
      </div>
      <div className={s.features}>
        <ul>
          <li>Necesitas...</li>
          <li>Una mancuerna</li>
        </ul>
      </div>
      <a href="#" className={s.btn}>
        Turorial
      </a>
    </div>
  );

}

export default Card;
