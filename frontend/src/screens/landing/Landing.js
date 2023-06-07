import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.sass";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";
import { isAuth } from "../../util/isAuth";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth()) {
      navigate("/home");
    }
  }, [navigate]);
  return (
    <div className="landing_container">
      <img src={logo} alt="logo" />
      <div class="title">Time Tracking App</div>
      <div class="buttons">
        <Button
          title="SIGN IN"
          onClick={() => {
            navigate("/login");
          }}
        />
        <Button
          title="SIGN UP"
          onClick={() => {
            navigate("/register");
          }}
        />
      </div>
    </div>
  );
};

export default Landing;
