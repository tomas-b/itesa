import { useRecoilValue } from "recoil";

import { userState } from "../Home";
import { capitalize } from "../../utils";
import BurgerMenu from "../../components/BurgerMenu";
import S from "./style.module.css";

const UserProfile = () => {
  const user = useRecoilValue(userState);

  return (
    <div>
      <div className={S.menu}>
        <BurgerMenu />
      </div>
      <div className={S.grid_wrapper}>
        <div className={S.avatar_container}>
          <div
            className={S.avatar}
            style={{ backgroundImage: `url(${user.avatar})` }}
          />
        </div>
        <div>
          <div className={S.displayName}>{capitalize(user.name)}</div>
          <div className={S.email}>{user.email}</div>
        </div>
      </div>
      <div className={S.stats}>
        {/* <div>{user.gender === "M" ? <p>Hombre</p> : <p>Mujer</p>}</div> */}
        <div className={S.box}>
          <div className={S.title}>Puntos</div>
          <div>{user.points}</div>
        </div>
        <div className={S.box}>
          <div className={S.title}>Workouts</div>
          {console.log("HOLAAAAA", user)}
          {user.ejerciciosRealizados.length ? (
            user.ejerciciosRealizados.map((ejercicio, index) => (
              <div key={index}>{ejercicio}</div>
            ))
          ) : (
            <div>{user.ejerciciosRealizados.length}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
