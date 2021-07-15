import { useParams } from "react-router";
import React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Card from "../../components/Card"

import s from "./style.module.css";

const Categories = () => {
  let {name} = useParams()

  let exercises = [
    {
      name: 'Bicep curl',
      needs: ['1 mancuerna'],
      image: 'https://cdn.discordapp.com/attachments/864138362306953229/864917391837626398/unknown.png'
    },
    {
      name: 'Bicep curl',
      needs: ['1 mancuerna'],
      image: 'https://cdn.discordapp.com/attachments/864138362306953229/864917391837626398/unknown.png'
    },
    {
      name: 'Bicep curl',
      needs: ['1 mancuerna'],
      image: 'https://cdn.discordapp.com/attachments/864138362306953229/864917391837626398/unknown.png'
    },
  ]

  return (
    <>
      <Menu />
      <div className={s.grid_wrapper}>
        <Header className={s.header} />
        <div className={s.welcome}>
          <h2>Descubre todos los ejercicios de {name}</h2>
        </div>
        <div className={s.search}>
          <input type="text" placeholder="Buscá tu ejercicio" />
        </div>
        <div className={s.grid}>
        <div className={s.carroussel}>
          {exercises.map(exercise => 
          <div className={s.item}>
            <Card {...exercise}/>
          </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

