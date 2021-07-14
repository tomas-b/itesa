import React, {useContext} from 'react';
import { AuthContext } from "../../Auth";
import base from "../../base";
import { useRecoilState } from 'recoil'
import Menu, { showMenuState } from '../../components/Menu'

const Home = () => {
  let [showMenu, setShowMenu] = useRecoilState(showMenuState)
  const user = useContext(AuthContext).currentUser;
  return (
    <>
			<Menu/>
      <h1>hi, {user.displayName}!</h1>
      <button onClick={() => base.auth().signOut()}>logout</button>
      <button onClick={() => setShowMenu(true)}>show</button>
    </>
  );
};

export default Home;