import React, { useState } from "react";
import { Link } from 'react-router-dom'
import base from "./../../../base";
import S from '../styles.module.css'

const SingUp = () => {
  let [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    ToS: "",
  });

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    base
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((res) => console.log(res))
      .catch((res) => console.error(res));
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    if(e.target.type === 'checkbox') value = e.target.checked
    setForm({ ...form, [name]: value });
    console.log(form)
  };

  return (
    <div className={S.container}>
    <div className={S.h1_wrapper}>
      <h1>REGISTRATE</h1>
    </div>
    <form onSubmit={formSubmit}>
      <input name="name" placeholder="nombre y apellido" onChange={inputChange} />
      <input name="email" placeholder="email" onChange={inputChange} />
      <input
        name="password"
        type="password"
        placeholder="contraseña"
        onChange={inputChange}
      />
      <select name="sex">
        <option value=''>sexo</option>
        <option value='H'>HOMBRE</option>
        <option value='M'>MUJER</option>
        <option value='O'>OTRO</option>
      </select>
      <div className={S.ToS_wrapper}>
      <input type="checkbox" name="ToS" onChange={inputChange}/>
      <label htmlFor="ToS">
        Acepto la 
        <a href="#">política de privacidad</a>
        y los 
        <a href="#">terminos y condiciones de uso</a>
        y Activaciones de Marketing.
      </label>
      </div>
      <input type="submit" value='registrarme'/>
      <div>
			¿Ya tenés cuenta? <Link to='/login'>Inicia Sesión</Link>
      </div>
    </form>
    </div>
  );
};

export default SingUp;
