import React, {useContext} from 'react';
import { AuthContext } from "../../Auth";
import base from "../../base";
import Menu, { ToggleBtn } from '../../components/Menu'

const Home = () => {
  const user = useContext(AuthContext).currentUser;
  return (
    <>
			<Menu/>
      <h1>hi, {user.displayName}!</h1>
      <button onClick={() => base.auth().signOut()}>logout</button>
			<ToggleBtn/>
    </>
  );
};

export default Home;