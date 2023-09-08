import React, { useState, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../../responsive";

const NavbarContainer = styled.div`
  height: 80px;
  font-family: "Urbanist", sans-serif;
  ${mobile({ height: "70px" })};
`;

const Wrapper = styled.div`
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 15px 0px 5px" })};
`;
const HamburgerMenu = styled.div`
  display: none;
  width: 30px;
  height: 25px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  & > div {
    width: 100%;
    height: 3px;
    background: #282862;
  }
  &:hover > div {
    background: "#282862";
  }
  ${mobile({ display: "flex" })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  ${mobile({ display: "none" })}
`;

const Item = styled.div`
  align-items: center;
  font-size: 18px;
  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  font-size: 30px;
  letter-spacing: 2px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const StyledLinkSearch = styled(Link)`
  text-decoration: none;
  color: #777;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
const Icons = styled.div`
  display: flex;
  cursor: pointer;
  gap: 15px;
  color: #777;
`;

const CartIcon = styled.div`
  position: relative;
`;
const Circle = styled.span`
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  color: white;
  position: absolute;
  right: -10px;
  top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Navbar = ({ click }) => {
  const [show, setShow] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const openButtonRef = useRef();

  const close = () => {
    setShow(false);
  };

  return (
    <NavbarContainer>
      <Wrapper>
        <HamburgerMenu onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerMenu>
        <Left>
          <Item>
            <img src="/img/en.png" alt="flag" />
            <KeyboardArrowDownIcon />
          </Item>
          <Item>
            <span>EUR</span>
            <KeyboardArrowDownIcon />
          </Item>
          <Item>
            <StyledLink to="/products/1">Face</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/products/2">Body</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/professionals">Professionals</StyledLink>
          </Item>
        </Left>
        <Center>
          <StyledLink to="/">KOSMEDiK</StyledLink>
        </Center>
        <Right>
          <Item>
            <StyledLink to="/treatments">Treatments</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/trainings">Trainings</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/about">About</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/contact">Contact</StyledLink>
          </Item>
          <Icons>
            <StyledLinkSearch to="/search">
              <SearchIcon />
            </StyledLinkSearch>
            <CartIcon>
              <ShoppingCartOutlinedIcon
                ref={openButtonRef}
                onClick={() => {
                  setShow((show) => !show);
                }}
              />
              <Circle>{products.length}</Circle>
            </CartIcon>
          </Icons>
        </Right>
      </Wrapper>
      {show && <Cart open={openButtonRef} close={close} />}
    </NavbarContainer>
  );
};

export default Navbar;
