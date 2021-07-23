import { db } from "../base";

export const getExercises = async () => {
  let exercises = await db.collection("exercises").get();
  return exercises.docs.map((exercise) => exercise.data());
};

export const getExercisesInCategory = async (category) => {
  const exercises = await db
    .collection("exercises")
    .where("category", "array-contains", category)
    .get();

  return exercises.docs.map((exercise) => exercise.data());
};

export const getCategories = async () => {
  const categories = await db.collection("categories").get();
  return categories.docs.map((category) => category.data());
};
