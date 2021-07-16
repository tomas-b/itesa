import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import S from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from 'recoil'
import { exercisesState } from '../../data/exercises.js'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../Auth";
import base from "../../base";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Timer from "../../components/Timer";

const Tutorial = () => {

	let [showTimer, setShowTimer] = useState(false)

	let paramId = useParams().video
	let [exercises, setExercises] = useRecoilState(exercisesState)
	let exer = exercises.find(exer => exer.id == paramId)

	let history = useHistory()
	let videoRef = useRef()

	useEffect(()=>{
		videoRef.current.addEventListener('playing', ()=>{
			videoRef.current.classList.add(S.playing)
		})
		if (showTimer)  videoRef.current.pause()
	},[showTimer])

  return (
    <>
      <Menu />
      <div className={S.grid_wrapper}>
        <Header className={S.header} />
				<div className={S.tutorial_wrapper}>
					<video ref={videoRef} autoPlay muted loop className={S.video}>
						<source src={exer.videoFile} type="video/mp4"/>
					</video> 

					<div className={`${S.description} ${showTimer ? S.timer : ''}`}>
						<h2>{exer.name}</h2>
						<button className={S.back} onClick={()=>history.goBack()} >
						<FontAwesomeIcon icon={faChevronCircleLeft}/> Atrás
						</button>
						<button onClick={()=>setShowTimer(true)}>Empezar Ejercicio</button>
						<Timer show={showTimer}/>
					</div>
				</div>
      </div>
    </>
  );

};

export default Tutorial;
