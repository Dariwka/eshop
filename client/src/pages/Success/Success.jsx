import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { clearCart } from "../../redux/cartReducer";
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
    color: #029e02;
  }
`;

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>
        Incase of any inqueries contact the support at
        <strong>info@kosmedik.eu</strong>
      </p>
    </Container>
  );
};

export default Success;
