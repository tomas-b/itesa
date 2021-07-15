import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth";
import base from "../../base";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Search from "../../components/Search";
import CategoriesCard from "../../components/CategoriesCard.jsx";
import s from "./style.module.css";

const Home = () => {
  let [gender, setGender] = useState("");
  const user = useContext(AuthContext).currentUser;

  useEffect(() => {
    // base
    //   .firestore()
    //   .collection("users")
    //   .get()
    //   .then((res) => res.forEach(user=>console.log(user.data())) )

    base
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((res) => setGender(res.data().gender));
  }, []);

  // let categories = ["Biceps", "Piernas", "Abdominales", "Pecho"];
  let categories = [
    { name: "Biceps", image: "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    { name: "Piernas", image: "https://www.risewisesewd.it/wp-content/uploads/2020/11/squat-fb.jpg" },
    { name: "Abdominales", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzqpShuUpo_tc_cXB_0p0NTsXizeHBBsS4w&usqp=CAU" },
    { name: "Pecho", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc241Aynp0zPG7UJT1ejQh-qjCxSkNjHobzA&usqp=CAU" },
  ];


  return (
    <>
      <Menu />
      <div className={s.grid_wrapper}>
        <Header className={s.header} />
        <div className={s.welcome}>
          <h2>Hola {user.displayName},</h2>
          <h3>Elegí tu ejercicio de hoy</h3>
        </div>
        <div className={s.search}>
          <Search />
        </div>
        <div className={s.title}>
          <h3>Qué músculo querés trabajar hoy?</h3>
        </div>
        <div className={s.grid}>
          {categories.map((category) => {
            return <CategoriesCard {...category}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
