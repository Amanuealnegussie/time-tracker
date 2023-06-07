import React from "react";
import "./Input.sass";

const Input = (props) => {
  return (
    <div className="input_container">
      <label>{props.label}</label>
      <input className="" autoComplete="off" {...props} />
    </div>
  );
};

export default Input;
