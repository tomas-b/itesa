import React, {useState} from "react";
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
      .then(res=>console.log(res))
      .catch(res=>console.error(res))
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  return (
    <form onSubmit={formSubmit}>
      <input name="name" placeholder="name" onChange={inputChange} />
      <input name="email" placeholder="email" onChange={inputChange} />
      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={inputChange}
      />
      <input type="submit" />
    </form>
  );
};

export default SingUp;
