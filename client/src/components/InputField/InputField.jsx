import React from "react";
import "./InputField.scss";

const InputField = (props) => {
  const { handleChange, label, name, type, value } = props;
  return (
    <div className="container">
      <label className="filterText" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        onChange={handleChange}
        value={value}
        name={name}
        required
      />
    </div>
  );
};

export default InputField;
