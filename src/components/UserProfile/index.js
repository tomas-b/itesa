import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";

import { db } from "../../base";
import BurgerMenu from "../BurgerMenu";
import S from "./style.module.css";

const UserProfile = () => {
  let [info, setInfo] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((res) => setInfo(res.data()));
  }, []);

  console.log("info", info);

  return (
    <div>
      <div>
        <BurgerMenu />
      </div>
      <div className={S.grid_wrapper}>
        <div className={S.avatar}>
          <div
            className={S.avatarImg}
            style={{ backgroundImage: `url(${info.avatar})` }}
          />
        </div>
        <div className={S.name}>
          <div className={S.fullName}>{currentUser.displayName}</div>
        </div>
        <div className={S.info}>
          <button className={S.button}>Ver Historial</button>
          <div>{info.gender === "M" ? <p>Hombre</p> : <p>Mujer</p>}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
