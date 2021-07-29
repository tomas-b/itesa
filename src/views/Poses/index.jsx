import React, { useState, useRef, useEffect } from "react";
import FastAverageColor from "fast-average-color";
import S from "./styles.module.css";
import { useRecoilValue } from "recoil";
import { currentExerciseState } from "../../data/currentExercise";
import BurgerMenu from '../../components/BurgerMenu'

const fac = new FastAverageColor();

const Poses = () => {
  let excercises = [
    { name: "curl", model: "9DHjJje2y" },
    { name: "circulito", model: "GnNXiBIym" },
  ];

  let modelId = excercises[0].model;

  const URL = `https://teachablemachine.withgoogle.com/models/${modelId}/`;
  let [model, setModel] = useState(null);
  let [webcam, setWebcam] = useState(null);
  let [class1, setClass1] = useState(0);
  let [class2, setClass2] = useState(0);
  let [avgColor, setAvgColor] = useState("#000");
  const [reps, setReps] = useState(0);
  const currentExercise = useRecoilValue(currentExerciseState);

  let w = window.innerWidth;
  // let h = window.innerHeight;

  let canvasRef = useRef();

  useEffect(() => {
    setReps(currentExercise.reps);
  }, [currentExercise]);

  let init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    let _model = await window.tmPose.load(modelURL, metadataURL);
    let _maxPredictions = _model.getTotalClasses();
    setModel(_model);

    const flip = true;
    let _webcam = new window.tmPose.Webcam(w, w, flip);
    // let _webcam = new window.tmPose.Webcam(w, h, flip);
    await _webcam.setup();
    await _webcam.play();
    let { height, width } = _webcam.webcam;
    console.log(height, width);
    setWebcam(_webcam);

    const canvas = canvasRef.current;
    canvas.width = w;
    canvas.height = height / width * w;
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(async () => {
    if (!webcam?.update) return;

    setInterval(() => {
      fac.getColorAsync(canvasRef.current).then((c) => setAvgColor(c.rgba));
    }, 1000);

    let ctx = canvasRef.current?.getContext("2d");

    let loop = async () => {
      try {
        ctx.clearRect(0,0,ctx.width, ctx.height);
        webcam.update();
        await predict();
      } catch (e) {
        console.log(e);
      }
      window.requestAnimationFrame(loop);
    };

    loop();

  }, [webcam?.update]);

  let up = false;
  let down = true;

  /*
  0: {className: "Class 1", probability: 1.7069904261436192e-16} DOWN
  1: {className: "Class 2", probability: 1} UP
  */

  let predict = async () => {

    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    // Voy bajando (down es class1)
    if (prediction[0].probability > 0.8 && !down) {
      setReps((reps) => {
        return reps - 1;
      });
      down = true;
      up = false;
    }

    // Voy subiendo (up es class2)
    if (prediction[1].probability > 0.8 && !up) {
      up = true;
      down = false;
    }

    setClass1(prediction[0].probability.toFixed(2));
    setClass2(prediction[1].probability.toFixed(2));

    // finally draw the poses
    drawPose(pose);
  };

  let drawPose = async (pose) => {
    let ctx = canvasRef.current?.getContext("2d");

    ctx.drawImage(webcam?.canvas, 0, 0);

    if (pose) {
      const minPartConfidence = 0.5;
      window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx, undefined,'red', 'red');
      window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, undefined, '#6e8afa');
    }
  };

  return (
    <>
      <div>

        <div className={S.ui_container}>

        <div className={S.header}>
          <BurgerMenu />
          <p>class data: 123</p>
        </div>

        <div className={ S.counter }>
          <div>
          <h2>{reps}</h2>
          <h3>Quedan 6</h3>
          </div>
        </div>

        <div className={ S.buttons }>
          <button>Terminar</button>
        </div>

        </div>

        <div className={S.canvas_container} style={{ backgroundColor: avgColor }}>
          <canvas id="canvas" ref={canvasRef}></canvas>
        </div>

      </div>
    </>
  );
};

export default Poses;
