import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";
import { atom, useRecoilState } from "recoil";

import { getUser } from "../../data/firestoreQueries";
import BurgerMenu from "../../components/BurgerMenu";
import S from "./style.module.css";

export const userState = atom({
  key: "user",
  default: {
    id: "",
    name: "",
    email: "",
    avatar: "",
    gender: "",
    points: 0,
    productosYaEscaneados: "",
  },
});

const UserProfile = () => {
  let [user, setUser] = useRecoilState(userState);
  const { currentUser } = useContext(AuthContext);

  // Traer la info del usuario de firebase y guardarla en recoil
  useEffect(() => {
    getUser(currentUser.uid).then((res) => {
      const userInfo = res.data();
      setUser({ ...userInfo, email: currentUser.email, id: currentUser.uid });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <BurgerMenu />
      </div>
      <div className={S.grid_wrapper}>
        <div className={S.avatar_container}>
          <div className={S.avatar} style={{ backgroundImage: `url(${user.avatar})` }} />
          <span className={S.small_text}>Cambiar</span>
        </div>
        <div className={S.name_container}>
          <div className={S.name}>{currentUser.displayName.toUpperCase()}</div>
          <div className={S.email}>{currentUser.email}</div>
        </div>
        <div className={S.info_container}>
          {/* <button className={S.button}>Ver Historial</button> */}
          <div>{user.gender === "M" ? <p>Hombre</p> : <p>Mujer</p>}</div>
          <div>{`Tenes ${user.points} Puntos`}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
