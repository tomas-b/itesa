import React, {useState} from "react";
import base from "./../../../base";
import { Link, useHistory } from 'react-router-dom'
import S from '../styles.module.css'

const LogIn = () => {

  let [form, setForm] = useState({
    email: "",
    password: "",
	});
	
	let history = useHistory()

  const formSubmit = (e) => {
    e.preventDefault();
    base
			.auth()
			.signInWithEmailAndPassword(form.email, form.password)
      .then(res=>console.error(res))
      .catch(res=>console.error(res))
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  return (
    <div className={S.container}>
    <div className={S.h1_wrapper}>
      <h1>INICIA SESIÓN</h1>
    </div>
    <form onSubmit={formSubmit}>
      <input name="email" placeholder="email" onChange={inputChange} />
      <input
        name="password"
        type="password"
        placeholder="contraseña"
        onChange={inputChange}
      />
      <div>
        ¿Has olvidado tu contraseña? 
        <a href="#">Recuperar</a>
      </div>
      <input type="submit" value='ingresar'/>
      <div>
			¿No tenés cuenta? <Link to='/singup'>Registrate</Link>
      </div>
    </form>
    </div>
  );
};

export default LogIn;
