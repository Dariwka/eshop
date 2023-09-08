import React from "react";
import styled from "styled-components";

const BackdropStyle = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
`;

const BackDrop = ({ click, show }) => {
  return show && <BackdropStyle onClick={click}></BackdropStyle>;
};

export default BackDrop;
