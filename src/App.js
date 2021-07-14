import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import SingUp from "./views/Auth/SignUp";
import LogIn from "./views/Auth/LogIn";
import Home from "./views/Home";

const App = () => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/singup" component={SingUp} />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default App;
