import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import SingUp from "./views/Auth/SignUp";
import LogIn from "./views/Auth/LogIn";
import Home from "./views/Home";
import UserProfile from "./views/UserProfile";
import Categories from "./views/Categories";
import Points from "./views/Points";
import Tutorial from "./views/Tutorial";
// import Poses from "./views/Poses";
import ClassifyPoses from "./views/ClassifyPoses";

const App = () => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/singup" component={SingUp} />
          <PrivateRoute exact path="/perfil" component={UserProfile} />
          <PrivateRoute path="/categories/:name" component={Categories} />
          <PrivateRoute path="/points" component={Points} />
          <PrivateRoute path="/tutorial" component={Tutorial} />
          <PrivateRoute path="/poses/" component={ClassifyPoses} />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default App;
