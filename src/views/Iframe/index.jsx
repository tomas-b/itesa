import React, { useEffect, useContext } from "react";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import { AuthContext } from "../../Auth";

export default () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Menu />
      <Header />
      <iframe
        style={{
          height: "calc(100vh - 82px)",
          width: "100vw",
          border: "none",
        }}
        src={`/mindar/index.html#id:${currentUser.uid}`}
      ></iframe>
    </>
  );
};
