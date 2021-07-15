import React, { useState } from "react";
import "mind-ar";
import MindArViewer from "../../components/MindArViewer";
import BurgerMenu from "../../components/BurgerMenu";
import s from "./style.module.css";

const Points = () => {
  const [started, setStarted] = useState(false);
  return (
    <div>
      <BurgerMenu />
      <div className={s.App}>
        <div>
          {!started && (
            <button
              onClick={() => {
                setStarted(true);
              }}
            >
              Start
            </button>
          )}
          {started && (
            <button
              onClick={() => {
                setStarted(false);
              }}
            >
              Stop
            </button>
          )}
        </div>

        {started && (
          <div className={s.container}>
            <MindArViewer />
            <video></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Points;
