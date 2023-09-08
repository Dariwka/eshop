import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  height: 30px;
  background-color: #c7e286;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  font-family: "Urbanist", sans-serif;
  ${mobile({ height: "50px" })}
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Order over 100€</Container>;
};

export default Announcement;
