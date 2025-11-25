import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const DrawerRoot = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  width: 70%;
  height: 100vh;
  background: #c7e286;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translateX(${({ $show }) => ($show ? "0" : "-100%")});
  transition: transform 0.3s ease-out;

  @media (min-width: 960px) {
    display: none;
  }
`;

const Links = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
`;

const DrawerLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1rem;
  text-align: center;

  text-decoration: none;
  color: #171717;
  font-size: 1.2rem;
  font-family: "Urbanist", sans-serif;

  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: green;
    color: #f4f4f4;
  }
`;
const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1rem;
  text-align: center;

  text-decoration: none;
  color: #171717;
  font-size: 1.2rem;
  font-family: "Urbanist", sans-serif;

  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: green;
    color: #f4f4f4;
  }
`;

const SideDrawer = ({ show, click }) => {
  return (
    <DrawerRoot $show={show}>
      <Links onClick={click}>
        <Item>
          <DrawerLink to="/">
            <HomeIcon />
          </DrawerLink>
        </Item>
        <Item>
          <DrawerLink to="/products/face">Face</DrawerLink>
        </Item>
        <Item>
          <DrawerLink to="/products/body">Body</DrawerLink>
        </Item>
        <Item>
          <DrawerLink to="/treatments">Treatments</DrawerLink>
        </Item>
        <Item>
          <DrawerLink to="/trainings">Trainings</DrawerLink>
        </Item>
        <Item>
          <DrawerLink to="/products/professionals">Professionals</DrawerLink>
        </Item>
        <Item>
          <ExternalLink
            href="https://www.posti.fi/en/private/parcels-and-tracking"
            target="_blank"
            rel="noreferrer"
          >
            Order Tracking
          </ExternalLink>
        </Item>
        <Item>
          <DrawerLink to="/terms">Terms</DrawerLink>
        </Item>
        <Item>
          <DrawerLink to="/about">About Us</DrawerLink>
        </Item>
        <Item>
          <DrawerLink to="/contact">Contact Us</DrawerLink>
        </Item>
      </Links>
    </DrawerRoot>
  );
};

export default SideDrawer;
