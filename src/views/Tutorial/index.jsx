import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { getExercises } from "../../data/firestoreQueries";
import S from "./styles.module.css";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Timer from "../../components/Timer";

const Tutorial = () => {
  let paramId = useParams().video;
  let [showTimer, setShowTimer] = useState(false);
  let [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({});

  useEffect(() => {
    // Traer todos los ejercicios
    getExercises().then((exercises) => {
      setExercises(exercises);

      // Despues traer el ejercicio actual segun el parametro id del url
      let currentExercise = exercises.find((exer) => exer.id == parseInt(paramId));
      setCurrentExercise(currentExercise);
      console.log(currentExercise);
    });
  }, []);

  let history = useHistory();
  let videoRef = useRef();

  useEffect(() => {
    videoRef.current.addEventListener("playing", () => {
      videoRef.current.classList.add(S.playing);
    });
    if (showTimer) videoRef.current.pause();
  }, [showTimer]);

  return (
    <>
      <Menu />
      <div className={S.grid_wrapper}>
        <div className={S.tutorial_wrapper}>
          <div className={S.header}>
            <Header />
          </div>

          <video ref={videoRef} autoPlay muted loop className={S.video}>
            <source src={currentExercise.video} type="video/mp4" />
          </video>

          <div className={`${S.description} ${showTimer ? S.timer : ""}`}>
            <h2>{currentExercise.name}</h2>
            <button className={S.back} onClick={() => history.goBack()}>
              <FontAwesomeIcon icon={faChevronCircleLeft} /> Atrás
            </button>
            <button onClick={() => setShowTimer(true)}>Empezar Ejercicio</button>
            <Timer show={showTimer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
