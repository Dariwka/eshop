import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  min-height: 60vh;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "10px", textAlign: "center" })};

  h2 {
    margin-bottom: 0.5rem;
    color: red;
  }
`;

const Cancel = () => {
  return (
    <Container>
      <h2>You Cancel your payment</h2>
      <p>Are you change your mind? or any issue with site?</p>
      <p>
        Incase of any inqueries contact the support at
        <strong> info@kosmedik.eu</strong>
      </p>
    </Container>
  );
};

export default Cancel;
