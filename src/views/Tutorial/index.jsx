import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import S from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { exercisesState } from "../../data/exercises.js";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Auth";
import base from "../../base";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Timer from "../../components/Timer";
import * as poseDetection from "@tensorflow-models/pose-detection";

const Tutorial = () => {
  let [showTimer, setShowTimer] = useState(false);

  let paramId = useParams().video;
  let [exercises, setExercises] = useRecoilState(exercisesState);
  let exer = exercises.find((exer) => exer.id == paramId);

  let history = useHistory();
  let videoRef = useRef();
  let canvasRef = useRef();
  useEffect(()=>{
		(async () => {

    videoRef.current.addEventListener("playing", () => {

      videoRef.current.classList.add(S.playing);

			let vidW = videoRef.current.videoWidth;
			let vidH = videoRef.current.videoHeight;
			let {width, height} = videoRef.current.getBoundingClientRect()

			canvasRef.current.height = vidH
			canvasRef.current.width = vidW
			canvasRef.current.style.width = width + 'px'
			canvasRef.current.style.height = height + 'px'
			console.log(height, width)

			let ctx = canvasRef.current.getContext('2d');
			ctx.beginPath();
			ctx.lineWidth = "10";
			ctx.strokeStyle = "#6e8afa";
			ctx.rect(0, 0, vidW, vidH);
			ctx.stroke();
    });

    // Create a detector.
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet
    );

		const drawOverVideo = (pose) => {
				let cv = canvasRef.current
				let ctx = cv.getContext('2d');
				ctx?.clearRect(0,0,cv.width, cv.height)
				pose.map(({x, y}) => {
					ctx?.beginPath();
					ctx?.arc(x, y, 5, 0, 2 * Math.PI);
					ctx?.stroke();
				})
		}

		const runPose = async () => {
			// Pass in a video stream to the model to detect poses.
			let poses = []
			try {
				poses = await detector.estimatePoses(videoRef.current);
			} catch(e) { console.error(e) }
			if(Array.isArray(poses[0]?.keypoints)) drawOverVideo(poses[0]?.keypoints);
			requestAnimationFrame(runPose)
		};

		requestAnimationFrame(runPose);

  })()}, []);

  useEffect(() => {
    if (showTimer) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [showTimer]);

  return (
    <>
      <Menu />
      <div className={S.grid_wrapper}>
        <div className={S.tutorial_wrapper}>
          <div className={S.header}>
            <Header />
          </div>

					<canvas ref={canvasRef} className={S.canvas}></canvas>
          <video ref={videoRef} autoPlay muted loop className={S.video}>
            <source src={exer.videoFile} type="video/mp4" />
          </video>

          <div className={`${S.description} ${showTimer ? S.timer : ""}`}>
            <h2>{exer.name}</h2>
            <button className={S.back} onClick={() => history.goBack()}>
              <FontAwesomeIcon icon={faChevronCircleLeft} /> Atrás
            </button>
            <button onClick={() => setShowTimer(true)}>
              Empezar Ejercicio
            </button>
            <Timer show={showTimer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
