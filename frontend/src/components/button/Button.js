import React from "react";
import "./Button.sass";

const Button = ({ onClick, title, small }) => {
  return (
    <button
      className={small ? "button_sm_container" : "button_container"}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
