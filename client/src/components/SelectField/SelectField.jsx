import React from "react";

import styled from "styled-components";

const ContainerSelected = styled.div`
  margin-bottom: 1rem;

  span {
    color: gray;
    font-size: small;
    font-size: 20px;
    font-weight: 600;
  }

  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
`;

const SelectField = (props) => {
  const { label, handleChange, name } = props;
  return (
    <ContainerSelected>
      <span className="filterText" htmlFor={name}>
        {label}
      </span>
      <select
        className="selected"
        onChange={handleChange}
        name={name}
        defaultValue="subject"
      >
        <option value="subject" disabled>
          Please Choose
        </option>
        <option value="work">Work</option>
        <option value="distribution">Distribution</option>
        <option value="appointment">Appointment</option>
        <option value="other">Other</option>
      </select>
    </ContainerSelected>
  );
};

export default SelectField;
