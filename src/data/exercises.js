import { atom } from "recoil";

export const exercisesState = atom({
	key: 'exercices',
	default: [
    {
			id: 1,
			videoFile: '/videos/1.mp4',
      name: "Abs",
      needs: [],
      image:
        "https://cdn.discordapp.com/attachments/864138362306953229/864917391837626398/unknown.png",
    },
    {
			id: 2,
			videoFile: '/videos/2.mp4',
      name: "Bicep Curls",
      needs: ["mancuerna"],
      image: "/exercises/pushups.png",
    },
    {
			id: 3,
			videoFile: '/videos/3.mp4',
      name: "Jumping Jacks",
      needs: [],
      image: "/exercises/squad.png",
    },
    {
			id: 4,
			videoFile: '/videos/4.mp4',
      name: "Push Ups",
      needs: [],
      image: "/exercises/squad.png",
    },
  ]
})