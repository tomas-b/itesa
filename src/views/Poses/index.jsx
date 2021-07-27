import React, { useState, useRef, useEffect } from "react";
import FastAverageColor from "fast-average-color";
// import * as tf from "@tensorflow/tfjs";
// import * as tmPose from "@teachablemachine/pose";
import { useParams } from "react-router-dom";
import S from "./styles.module.css";
import { useRecoilValue } from 'recoil';
import { currentExerciseState } from "../../data/currentExercise";

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
  let [run, setRun] = useState(false);
  let [maxPredictions, setMaxPredictions] = useState(null);
  let [class1, setClass1] = useState(0);
  let [class2, setClass2] = useState(0);
  let [avgColor, setAvgColor] = useState("#000");
  const [reps, setReps] = useState(0);
  const currentExercise = useRecoilValue( currentExerciseState )

  let w = window.innerWidth;
  let h = window.innerHeight;

  let canvasRef = useRef();

  useEffect(()=>{
    setReps( currentExercise.reps )
  }, [currentExercise])

  let init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    let _model = await window.tmPose.load(modelURL, metadataURL);
    let _maxPredictions = _model.getTotalClasses();
    setModel(_model);
    setMaxPredictions(_maxPredictions);

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    let _webcam = new window.tmPose.Webcam(w, w, flip); // width, height, flip
    await _webcam.setup(); // request access to the webcam
    await _webcam.play();
    let { height, width } = _webcam.webcam;
    console.log(height, width);
    setWebcam(_webcam);

    // window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    // const canvas = document.getElementById("canvas");
    const canvas = canvasRef.current;
    canvas.width = w;
    canvas.height = height;
    // ctx = canvas.getContext("2d");
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) {
    //   // and class labels
    //   labelContainer.appendChild(document.createElement("div"));
    // }

    setRun(true);
  };

  useEffect(async () => {
    await init();
  }, []);

  useEffect(async () => {
    if (!webcam?.update) return;

    setInterval(() => {
      fac.getColorAsync(canvasRef.current).then((c) => setAvgColor(c.rgba));
    }, 1000);

    let loop = async () => {
      try {
        webcam.update(); // update the webcam frame
        await predict();
      } catch (e) {
        console.log(e);
      }
      window.requestAnimationFrame(loop);
      // setTimeout(loop, 1500);
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
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    // console.log(pose, posenetOutput)

    const prediction = await model.predict(posenetOutput);

    // Voy bajando (down es class1)
    if (prediction[0].probability > 0.8 && !down) {
      setReps((reps) => {
        // if (reps > 4) {
        //   finished();
        // }
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

    // for (let i = 0; i < maxPredictions; i++) {
    //   const classPrediction =
    //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //   labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    // console.log(JSON.stringify(prediction))

    // console.log(prediction);

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
      window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  };

  const finished = () => {
    console.log("finished");
    webcam?.stop();
  };

  return (
    <div>
      <div className={S.container} style={{ backgroundColor: avgColor }}>
        <p>Reps: {reps}</p>
        <canvas id="canvas" ref={canvasRef}></canvas>
        <div id="label-container">
          <div className={`${S.bar} ${S.first}`}>
            {" "}
            <span>{class1}</span>
            <div style={{ width: class1 * 100 + "%" }}></div>
          </div>
          <div className={`${S.bar} ${S.second}`}>
            {" "}
            <span>{class2}</span>
            <div style={{ width: class2 * 100 + "%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poses;
