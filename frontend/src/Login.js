import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from './Alert'
import './Login.scss'

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: ""
}

function Login({ login, create }) {
  const [returning, setReturning] = useState(true);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [alert, setAlert] = useState(null);

  let history = useHistory();

  function toggleForm(state) {
    setReturning(state);
    setForm(INITIAL_FORM_STATE);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    try {
      await login(form);
      history.push("/jobs");
    } catch (err) {
      setAlert(<Alert messages={err} />)
      setTimeout(() => setAlert(null), 4000)
    }
  }

  async function handleCreate(evt) {
    evt.preventDefault();
    try {
      await create(form);
      history.push("/jobs");
    } catch (err) {
      setAlert(<Alert messages={err} />)
      setTimeout(() => setAlert(null), 6000)
    }
  }


  const { username, password, firstName, lastName, email } = form;

  const loginForm = (
    <form className="loginForm" onSubmit={handleLogin}>
      <div className="form-group">
        <input id="username"
          className="form-control"
          name="username"
          type="text"
          required
          onChange={handleChange}
          value={username}
          placeholder="Username"/>
      </div>
      <div className="form-group">
        <input id="password"
          className="form-control"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password}
          placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>

    </form>
  )

  const signUpForm = (
    <form className="Login-signUpForm" onSubmit={handleCreate}>
      <div className="form-group">
        <input id="username"
          className="form-control"
          name="username"
          type="text"
          required
          onChange={handleChange}
          value={username}
          placeholder="Username"/>
      </div>
      <div className="form-group">
        <input id="password"
          className="form-control"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password}
          placeholder="Password"/>
      </div>
      <div className="form-group">
        <input id="firstName"
          className="form-control"
          name="first_name"
          type="text"
          required
          onChange={handleChange}
          value={firstName}
          placeholder="First Name"/>
      </div>
      <div className="form-group">
        <input id="lastName"
          className="form-control"
          name="last_name"
          type="text"
          required
          onChange={handleChange}
          value={lastName}
          placeholder="Last Name"/>
      </div>
      <div className="form-group">
        <input id="email"
          className="form-control"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={email}
          placeholder="Email"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

  return (
    <div className="Login pt-5">
      <div className="Login-form col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <div className="card">
        <div className="text-right mt-3 mr-3">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={`btn ${returning ? "btn-primary" : "btn-outline-primary"}`}>
              <input type="radio"
                     name="options"
                     id="options1"
                     autoComplete="off"
                     onChange={() => toggleForm(true)} />
                     Login
            </label>
            <label className={`btn ${!returning ? "btn-primary" : "btn-outline-primary"}`}>
              <input type="radio"
                     name="options"
                     id="options2"
                     autoComplete="off"
                     onChange={() => toggleForm(false)} />Signup
            </label>
          </div>
        </div>
          <div className="card-body">
            {alert ? alert : ""}
            {returning ? loginForm : signUpForm}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;