import React, { useState, useRef, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as tmPose from "@teachablemachine/pose";

const Poses = () => {

  const URL = "https://teachablemachine.withgoogle.com/models/9DHjJje2y/";
  let [model, setModel] = useState(null)
  let [webcam, setWebcam] = useState(null)
  let [run, setRun] = useState(false)
  let [maxPredictions, setMaxPredictions] = useState(null)
  let [class1, setClass1] = useState(0)
  let [class2, setClass2] = useState(0)

  let canvasRef = useRef()

  let init = async () => {

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    let _model = await window.tmPose.load(modelURL, metadataURL);
    let _maxPredictions = _model.getTotalClasses();
    setModel(_model)
    setMaxPredictions(_maxPredictions)


    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    let _webcam = new window.tmPose.Webcam(200, 200, flip); // width, height, flip
    await _webcam.setup(); // request access to the webcam
    _webcam.play();
    setWebcam(_webcam)

    // window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    // const canvas = document.getElementById("canvas");
    const canvas = canvasRef.current
    canvas.width = 200;
    canvas.height = 200;
    // ctx = canvas.getContext("2d");
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) {
    //   // and class labels
    //   labelContainer.appendChild(document.createElement("div"));
    // }

    setRun(true)

  };

  useEffect(()=>{
    if(!run) return;
    let loop = async ()=>{
      webcam.update(); // update the webcam frame
      await predict();
      window.requestAnimationFrame(loop);
      // setTimeout(loop, 1500);
    }
    loop()
  },[run])

  let predict = async () => {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    console.log(pose, posenetOutput)
    const prediction = await model.predict(posenetOutput);

    // for (let i = 0; i < maxPredictions; i++) {
    //   const classPrediction =
    //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //   labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    console.log(JSON.stringify(prediction))
    setClass1(prediction[0].probability.toFixed(2))
    setClass2(prediction[1].probability.toFixed(2))

    // finally draw the poses
    drawPose(pose);
  }

  let drawPose = async (pose) => {
    let ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(webcam?.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }

  return (
    <>
      <div>Teachable Machine Pose Model</div>
      <button type="button" onClick={init}>
        Start
      </button>
      <div>
        <canvas id="canvas" ref={canvasRef}></canvas>
      </div>
      <div id="label-container">
      class 1 {class1} <br/>
      class 2 {class2}
      </div>
    </>
  );
}

export default Poses;
