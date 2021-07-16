import { atom } from "recoil";

export const exercisesState = atom({
	key: 'exercices',
	default: [
    {
			id: 1,
			videoFile: '/exercises/videos/1.mp4',
      name: "Abdominales",
      needs: [],
      image:
        "/exercises/images/1.png",
    },
    {
			id: 2,
			videoFile: '/exercises/videos/2.mp4',
      name: "Curl de Biceps",
      needs: ["mancuernas"],
      image: "/exercises/images/2.png",
    },
    {
			id: 3,
			videoFile: '/exercises/videos/3.mp4',
      name: "Saltos de Tijera",
      needs: [],
      image: "/exercises/images/3.png",
    },
    {
			id: 4,
			videoFile: '/exercises/videos/4.mp4',
      name: "Lagartijas",
      needs: [],
      image: "/exercises/images/4.png",
    },
  ]
})