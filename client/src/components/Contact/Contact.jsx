import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";

const Container = styled.div`
  background-color: green;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: center;
  ${mobile({ padding: "10px" })}
`;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", width: "100%" })}
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  ${mobile({ padding: "5px" })}
`;

const Button = styled.button`
  padding: 10px;
  color: white;
  background-color: #333;
  border-radius: 0 5px 5px 0;
  border: none;
  ${mobile({ padding: "5px" })}
`;

const Icons = styled.div`
  display: flex;
  gap: 10px;
  ${mobile({ margin: "5px" })}
`;

const Span = styled.span`
  ${mobile({ margin: "5px" })}
`;

const Mail = styled.div``;

const Contact = () => {
  return (
    <Container>
      <Wrapper>
        <Span>BE IN TOUCH WITH US:</Span>
        <Mail>
          <Input type="text" placeholder="Enter your email..." />
          <Button>JOIN US</Button>
        </Mail>
        <Icons>
          <FacebookIcon />
          <InstagramIcon />
          <GoogleIcon />
        </Icons>
      </Wrapper>
    </Container>
  );
};

export default Contact;
