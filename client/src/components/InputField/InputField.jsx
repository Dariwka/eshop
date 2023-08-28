import React from "react";
import "./InputField.scss";

const InputField = (props) => {
  const { handleChange, label, name, type, value } = props;
  return (
    <div className="container">
      <span className="filterText" html={name}>
        {label}
      </span>
      <input
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
