import React from "react";
import "./TextArea.scss";

const TextArea = (props) => {
  const { handleChange, label, name, value } = props;
  return (
    <div className="container">
      <span htmlFor={name}>{label}</span>
      <textarea
        name={name}
        onChange={handleChange}
        value={value}
        rows="6"
      ></textarea>
    </div>
  );
};

export default TextArea;
