import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart } from "../../redux/cartReducer";

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;

const Success = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>info@kosmedik.eu</strong>
      </p>
    </Container>
  );
};

export default Success;
