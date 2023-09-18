import React from "react";
import styled from "styled-components";

const ContainerText = styled.div`
  span {
    color: gray;
    font-size: small;
    font-size: 20px;
    font-weight: 600;
  }
  textarea {
    width: 100%;
    margin: 8px 0;
  }
`;

const TextArea = (props) => {
  const { handleChange, label, name, value } = props;
  return (
    <ContainerText>
      <span htmlFor={name}>{label}</span>
      <textarea
        name={name}
        onChange={handleChange}
        value={value}
        rows="6"
      ></textarea>
    </ContainerText>
  );
};

export default TextArea;
