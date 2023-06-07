import React, { useState } from "react";
import "./Register.sass";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import { postRequest } from "../../util/axiosHandler";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.password !== state.repeatPassword) {
      toast.error("Password Don't Match");
    } else {
      postRequest("api/users", {
        name: state.name,
        password: state.password,
        email: state.email,
      }).then((res) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res));
          navigate("/home");
        }
      });
    }
  };
  return (
    <div className="register_container">
      <form class="card">
        <div class="title">Create An Account</div>
        <Input
          label="Name"
          type="text"
          value={state.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
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
        <Input
          label="Repeat Password"
          type="password"
          value={state.repeatPassword}
          onChange={(e) => handleChange("repeatPassword", e.target.value)}
        />
        <Button title="SIGN UP" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default Register;
