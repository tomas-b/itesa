import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";

import { db } from "../../base";
import BurgerMenu from "../../components/BurgerMenu";
import S from "./style.module.css";

const UserProfile = () => {
  let [info, setInfo] = useState("");
  const { currentUser } = useContext(AuthContext);
  let [exercises, setExercises] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((res) => {
        setInfo(res.data());
        setExercises(res.data().ejerciciosRealizados);
      });
  }, []);

  return (
    <div>
      <div>
        <BurgerMenu />
      </div>
      <div className={S.grid_wrapper}>
        <div className={S.avatar_container}>
          <div
            className={S.avatar}
            style={{ backgroundImage: `url(${info.avatar})` }}
          />
          <span className={S.small_text}>Cambiar</span>
        </div>
        <div className={S.name_container}>
          <div className={S.name}>{currentUser.displayName.toUpperCase()}</div>
          <div className={S.email}>{currentUser.email}</div>
        </div>
        <div className={S.info_container}>
          {/* <button className={S.button}>Ver Historial</button> */}
          <div>{info.gender === "M" ? <p>Hombre</p> : <p>Mujer</p>}</div>
          <div
            className={S.point_container}
          >{`Tenes ${info.points} Puntos`}</div>
          <div>{"Ejercicios:"}</div>
          {exercises.map((ejercicio, index) => (
            <div key={index}>
              <p>{ejercicio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
