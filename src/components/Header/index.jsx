import BurgerMenu from "../BurgerMenu";
import S from "./styles.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={S.header}>
      <BurgerMenu />
      <Link to="/perfil">
        <div
          className={S.avatar}
          style={{ backgroundImage: `url('/avatar.bmp')` }}
        />
      </Link>
    </div>
  );
};

export default Header;
