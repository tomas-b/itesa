import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";

import { auth, db } from "./../../../base";
import S from "../styles.module.css";

const SingUp = () => {
  let history = useHistory();

  const [message, setMessage] = useState("");
  let [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    ToS: "",
    gender: "",
  });

  const formSubmit = (e) => {
    setMessage("");
    e.preventDefault();
    if (form.name.trim() === "") {
      setMessage("");
    }

    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(({ user }) => {
        user
          .updateProfile({
            displayName: form.name,
          })
          .then(() => {
            db.collection("users")
              .doc(user.uid)
              .set({
                gender: form.gender,
                avatar:
                  "https://static1.abc.es/media/play/2020/09/29/avatar-kE4H--1200x630@abc.jpeg",
                points: 0,
                name: user.displayName,
                productosYaEscaneados: "valorDefault",
              })
              .then((res) => history.push("/"));
          })
          .catch((res) => console.error(res));
      })
      .catch((res) => {
        switch (res.code.split("/")[1]) {
          case "email-already-in-use":
            setMessage("El email ya esta en uso");
            break;
          default:
            setMessage("Ocurrio un error, por favor intentar nuevamente");
        }
      });
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") value = e.target.checked;
    setForm({ ...form, [name]: value });

    switch (name) {
      case "name":
        if (!validator.isAlpha(value)) setMessage("Nombre invalido");
        else setMessage("");
        break;
      case "email":
        if (!validator.isEmail(value)) setMessage("Por favor ingresa un email valido");
        else setMessage("");
        break;
      case "password":
        if (!validator.isStrongPassword(value, { minLength: 6 }))
          setMessage("La contraseña debe contener al menos 6 caracteres");
        else setMessage("");
        break;
      default:
        if (validator.isEmpty(value)) setMessage("Por favor completar todos los campos");
        else {
          setMessage("");
        }
    }
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") value = e.target.checked;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className={S.container}>
      <div className={S.h1_wrapper}>
        <h1>REGISTRATE</h1>
      </div>
      <form onSubmit={formSubmit}>
        {message && <div>{message}</div>}
        <input
          name="name"
          placeholder="NOMBRE Y APELLIDO"
          onChange={inputChange}
          onBlur={validateInput}
        />
        <input
          name="email"
          placeholder="EMAIL"
          onChange={inputChange}
          onBlur={validateInput}
        />
        <input
          name="password"
          type="password"
          placeholder="CONTRASEÑA"
          onChange={inputChange}
          onBlur={validateInput}
        />
        <select name="gender" onChange={inputChange} onBlur={validateInput}>
          <option value="">SEXO</option>
          <option value="M">HOMBRE</option>
          <option value="F">MUJER</option>
        </select>
        <div className={S.ToS_wrapper}>
          <input type="checkbox" name="ToS" required />
          <label htmlFor="ToS">
            Acepto la
            <a href="#">política de privacidad</a>y los
            <a href="#">terminos y condiciones de uso</a>y Activaciones de Marketing.
          </label>
        </div>
        <input type="submit" value="REGISTRARME" />
        <div>
          ¿Ya tenés cuenta? <Link to="/login">Inicia Sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default SingUp;
