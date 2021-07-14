import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import base from "./base";
import { AuthProvider, AuthContext } from "./Auth";
import SingUp from "./views/Auth/SignUp";
import LogIn from "./views/Auth/LogIn";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/singup" component={SingUp} />
      </BrowserRouter>
    </AuthProvider>
  );
};

const Home = () => {
  const user = useContext(AuthContext).currentUser;
  const [gender, setGender] = useState("");

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
      <h1>hi, {user.displayName}!</h1>
      <pre>{gender}!</pre>
      <button onClick={() => base.auth().signOut()}>logout</button>
    </>
  );
};

export default App;
