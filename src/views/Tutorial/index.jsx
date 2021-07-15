import React, { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import S from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from 'recoil'
import { exercisesState } from '../../data/exercises.js'
import { useHistory } from 'react-router-dom'

const Tutorial = () => {

	let paramId = useParams().video
	let [exercises, setExercises] = useRecoilState(exercisesState)
	let exer = exercises.find(exer => exer.id == paramId)

	let history = useHistory()
	let videoRef = useRef()

	useEffect(()=>{
		videoRef.current.addEventListener('playing', ()=>{
			videoRef.current.classList.add(S.playing)
		})
	},[])


	return (
	<div className={S.tutorial_wrapper}>
		<div className={S.go_back} onClick={()=>history.goBack()}>
			 <FontAwesomeIcon icon={faChevronCircleLeft}/> <span>Go Back</span>
		</div>
		<video ref={videoRef} autoPlay muted loop className={S.video}>
			<source src={exer.videoFile} type="video/mp4"/>
		</video> 
		<div className={S.description}>
			<h2>{exer.name}</h2>
			<button>Start Exercise</button>
		</div>
	</div>
	)

}

export default Tutorial