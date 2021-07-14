import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import S from "./styles.module.css";

const Search = () => {
  return (
    <div className={S.search_wrapper}>
      <FontAwesomeIcon icon={faSearch} />
      <input type="text" placeholder="Buscá tu ejercicio" />
    </div>
  );
};

export default Search;
