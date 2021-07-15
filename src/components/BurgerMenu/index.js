import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { showMenuState } from "../../components/Menu";
import S from "./styles.module.css";
import { useRecoilState } from "recoil";

const Header = () => {
  let [showMenu, setShowMenu] = useRecoilState(showMenuState);
  console.log("showMenu en BurgerMenu", showMenu);

  return (
    <div>
      <FontAwesomeIcon
        className={S.icon}
        icon={faBars}
        onClick={() => {
          console.log("hola");
          setShowMenu(true);
        }}
      />
    </div>
  );
};

export default Header;
