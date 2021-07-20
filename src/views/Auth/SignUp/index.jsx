import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import base from "./../../../base";
import S from "../styles.module.css";

const SingUp = () => {
    let history = useHistory();

    let [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        ToS: "",
        gender: "",
    });

    const formSubmit = (e) => {
        e.preventDefault();
        if (form.name.trim() === "") {
            return alert("El nombre no puede ser vacio");
        }
        base.auth()
            .createUserWithEmailAndPassword(form.email, form.password)
            .then(({ user }) => {
                user.updateProfile({
                    displayName: form.name,
                })
                    .then(() => {
                        base.firestore()
                            .collection("users")
                            .doc(user.uid)
                            .set({
                                gender: form.gender,
                                avatar: "https://i.stack.imgur.com/frlIf.png",
                                points: 0,
                                name: user.displayName,
                                productosYaEscaneados: "valorDefault",
                            })
                            .then((res) => history.push("/"));
                    })
                    .catch((res) => console.error(res));
            })
            .catch((res) => {
                console.error(res);
                alert(res.message);
            });
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
                <input
                    name="name"
                    placeholder="NOMBRE Y APELLIDO"
                    onChange={inputChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="EMAIL"
                    onChange={inputChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    minLength="6"
                    title="La contraseña debe tener un minimo de 6 caracteres"
                    placeholder="CONTRASEÑA"
                    onChange={inputChange}
                    required
                />
                <select name="gender" required onChange={inputChange}>
                    <option value="">SEXO</option>
                    <option value="M">HOMBRE</option>
                    <option value="F">MUJER</option>
                </select>
                <div className={S.ToS_wrapper}>
                    <input
                        type="checkbox"
                        name="ToS"
                        onChange={inputChange}
                        required
                    />
                    <label htmlFor="ToS">
                        Acepto la
                        <a href="#">política de privacidad</a>y los
                        <a href="#">terminos y condiciones de uso</a>y
                        Activaciones de Marketing.
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
