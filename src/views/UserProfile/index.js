import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";
import { atom, useRecoilState } from "recoil";

import { getUser } from "../../data/firestoreQueries";
import BurgerMenu from "../../components/BurgerMenu";
import S from "./style.module.css";
import { capitalize } from "../../utils";

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
        <div className={S.menu}>
          <BurgerMenu />
        </div>
        <div className={S.avatar} style={{ backgroundImage: `url(${user.avatar})` }} />
        <div>
          <div className={S.displayName}>{capitalize(currentUser.displayName)}</div>
          <div className={S.email}>{currentUser.email}</div>
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
          <div>0</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
