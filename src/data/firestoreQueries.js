import { db } from "../base";

export const getExercises = async () => {
  let exercises = await db.collection("exercises").get();
  return exercises.docs.map((exercise) => exercise.data());
};

export const getCategories = async () => {
  let categories = await db.collection("categories").get();
  return categories.docs.map((category) => category.data());
};
