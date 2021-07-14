import React from "react";
import { atom, useRecoilState } from "recoil";
import { useSpring, animated as a } from "@react-spring/web";
import S from "./styles.module.css";

export const showMenuState = atom({
  key: "showMenu",
  default: false,
});

const Menu = () => {
  let [showMenu, setShowMenu] = useRecoilState(showMenuState);

  let animation = useSpring({
    to: showMenu
      ? { opacity: 1, transform: "translateX(0%)" }
      : { opacity: 0, transform: "translateX(-100%)" },
  });

  return (
    showMenu && (
      <a.div className={S.menu_container} style={animation}>
        <h1>Menu</h1>
        <button onClick={() => setShowMenu(false)}>hide</button>
      </a.div>
    )
  );
};

// export const ToggleBtn = () => {
// 	let [showMenu, setShowMenu] = useRecoilState(showMenuState)
// 	return <button onClick={()=>setShowMenu(!showMenu)}>{showMenu ? 'hide' : 'show'}</button>
// }

export default Menu;
