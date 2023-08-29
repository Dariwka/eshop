import React from "react";
import "./SelectField.scss";

const SelectField = (props) => {
  const { label, handleChange, name } = props;
  return (
    <div className="container">
      <span className="filterText" htmlFor={name}>
        {label}
      </span>
      <select onChange={handleChange} name={name} defaultValue="subject">
        <option value="subject" disabled>
          Please Choose
        </option>
        <option value="work">Work</option>
        <option value="distribution">Distribution</option>
        <option value="appointment">Appointment</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default SelectField;
