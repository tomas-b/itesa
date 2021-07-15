import BurgerMenu from "../BurgerMenu";
import S from "./styles.module.css";

const Header = () => {
  return (
    <div className={S.header}>
      <BurgerMenu />
      <div className={S.avatar} style={{ backgroundImage: `url('/avatar.bmp')` }} />
    </div>
  );
};

export default Header;
