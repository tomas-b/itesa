import React, {useState} from "react";
import base from "./../../../base";
import { Link, useHistory } from 'react-router-dom'

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
      .then(res=>console.log(res))
      .catch(res=>console.error(res))
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  return (
    <form onSubmit={formSubmit}>
      <input name="email" placeholder="email" onChange={inputChange} />
      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={inputChange}
      />
      <input type="submit" />
			<Link to='/singup'>singup</Link>
    </form>
  );
};

export default LogIn;
