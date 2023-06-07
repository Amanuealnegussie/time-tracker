import React, { useState } from "react";
import "./Login.sass";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { postRequest } from "../../util/axiosHandler";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    postRequest("api/users/login", {
      password: state.password,
      email: state.email,
    }).then((res) => {
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/home");
      }
    });
  };
  return (
    <div className="login_container">
      <form class="card">
        <div class="title">Login</div>
        <Input
          label="Email"
          type="email"
          value={state.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={state.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <Button title="SIGN IN" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default Login;
