import React, { useState } from "react";
import base from "./../../../base";

const SingUp = () => {
  let [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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
    setForm({ ...form, [name]: value });
  };

  return (
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
      <input type="checkbox" name="ToS" />
      <label for="ToS">
        Acepto la 
        <a href="#">política de privacidad</a>
        y los 
        <a href="#">terminos y condiciones de uso</a>
        y Activaciones de Marketing.
      </label>
      <input type="submit" />
    </form>
  );
};

export default SingUp;
