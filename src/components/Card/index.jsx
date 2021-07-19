import React from "react";
import { Link } from "react-router-dom";
import s from "./style.module.css";

const Card = ({ exercise, setCurrentExercise }) => {
  console.log("exercise", exercise);
  return (
    <div className={s.card}>
      <div className={s.title}>{exercise.name}</div>
      <div className={s.features}>
        <ul>
          <li>Necesitas...</li>
          {exercise.needs && <li>{exercise.needs.join(", ")}</li>}
        </ul>
      </div>
      {/* style={{ backgroundImage: `url('${exercise.image}')` }} */}
      <div className={s.image_container}>
        <img className={s.image} src={exercise.image} alt={exercise.name} />
      </div>
      <div className={s.btn_wrapper}>
        <Link
          to={`/tutorial/${exercise.id}`}
          className={s.btn}
          onClick={() => setCurrentExercise(exercise)}
        >
          Ver Tutorial
        </Link>
      </div>
    </div>
  );
};

export default Card;
