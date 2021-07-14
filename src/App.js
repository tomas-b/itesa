import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import base from "./base";
import { AuthProvider, AuthContext } from "./Auth";
import SingUp from "./views/Auth/SignUp";
import LogIn from "./views/Auth/LogIn";
import PrivateRoute from './PrivateRoute';

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
  return (
    <>
      <h1>hi, {user.displayName}!</h1>
      <button onClick={() => base.auth().signOut()}>logout</button>
    </>
  );
};

export default App;
