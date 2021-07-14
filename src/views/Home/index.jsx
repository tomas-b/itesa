import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from "../../Auth";
import base from "../../base";
import { useRecoilState } from 'recoil'
import Menu, { showMenuState } from '../../components/Menu'

const Home = () => {
  let [showMenu, setShowMenu] = useRecoilState(showMenuState)
  let [gender, setGender] = useState('')
  const user = useContext(AuthContext).currentUser;

  useEffect(()=>{

  // base
  //   .firestore()
  //   .collection("users")
  //   .get()
  //   .then((res) => res.forEach(user=>console.log(user.data())) )

  base
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((res) => setGender(res.data().gender) )
  }, [])

  return (
    <>
			<Menu/>
      <h1>hi, {user.displayName}!</h1>
      <h2> {gender} </h2>
      <button onClick={() => setShowMenu(true)}>show</button>
    </>
  );
};

export default Home;