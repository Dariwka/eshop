import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Cart from "../Cart/Cart";
import { getCurrentUser } from "../../utils/auth";
import { mobile } from "../../responsive";

/* ========== styled ========== */

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
    background: #282862;
  }
  ${mobile({ display: "flex" })};
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  ${mobile({ display: "none" })};
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.02em;
  ${mobile({ display: "none" })};
`;
const Center = styled.div`
  font-size: 30px;
  letter-spacing: 2px;
  font-weight: 600;
  ${mobile({ fontSize: "24px", letterSpacing: "1.5px" })};
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
  &:hover,
  &:active {
    color: #0a7c5f;
    text-decoration: none;
  }
`;
const StyledLinkSearch = styled(Link)`
  text-decoration: none;
  color: #777;
  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
  &:hover,
  &:active {
    color: #0a7c5f;
    text-decoration: none;
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  ${mobile({ gap: "14px" })};
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  color: #777;
  svg {
    font-size: 22px;
    display: block;
  }
  & > a,
  & > div,
  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    flex: 0 0 auto;
  }
`;
const DesktopOnly = styled.div`
  display: flex;
  ${mobile({
    display: "none",
  })};
`;
/* ====== icon button (важно: кликается 100%) ====== */ const IconBtn = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  color: #777;
  &:hover {
    color: #0a7c5f;
  }
`;
/* ====== cart ====== */ const CartWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
`;
const Circle = styled.span`
  position: absolute;
  right: -6px;
  top: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 50%;
  background-color: green;
  color: white;
  font-size: 11px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;
/* ====== account dropdown ====== */ const AccountWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  z-index: 900;
`;
const AccountButton = styled(IconBtn)`
  svg {
    font-size: 26px;
  }
`;
const AccountMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
  min-width: 210px;
  z-index: 300;
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const AccountMenuItem = styled(Link)`
  min-height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  text-decoration: none;
  color: #171717;
  line-height: 1.4;
  &:hover {
    background-color: #f4f4f4;
  }
`;
const AccountMenuDivider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 6px 0;
`;
const LogoutButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  color: #b00020;
  &:hover {
    background-color: #fff0f0;
  }
`;
const ProTag = styled.span`
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background-color: #0a7c5f;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
`;
/* ========== component ========== */ const Navbar = ({ click }) => {
  const products = useSelector((state) => state.cart.products);
  const [showCart, setShowCart] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const cartBtnRef = useRef(null);
  const accountRef = useRef(null);
  const user = getCurrentUser();
  const isLoggedIn = !!user;
  const isPro = !!user?.isPro; // close on outside click (account + cart)
  //
  useEffect(() => {
    const onMouseDown = (e) => {
      // account
      //
      if (
        isAccountOpen &&
        accountRef.current &&
        !accountRef.current.contains(e.target)
      ) {
        setIsAccountOpen(false);
      } // cart (Cart.jsx сам тоже умеет закрываться по outside, но тут подстрахуем)
      //
      if (
        showCart &&
        cartBtnRef.current &&
        !cartBtnRef.current.contains(e.target)
      ) {
        // НЕ закрываем, если клик внутри самого Cart popup (он fixed и вне DOM-ветки Navbar)    // поэтому закрытие корзины лучше делегировать Cart.jsx через onClose.
        //
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isAccountOpen, showCart]);
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.setItem("logoutSuccess", "true");
    setIsAccountOpen(false);
    window.location.href = "/";
  };
  return (
    <NavbarContainer>
      {" "}
      <Wrapper>
        {" "}
        <HamburgerMenu onClick={click} aria-label="Avaa valikko">
          <div /> <div /> <div />{" "}
        </HamburgerMenu>{" "}
        <Left>
          {" "}
          <Item>
            <img src="/img/fi.png" alt="flag" /> <KeyboardArrowDownIcon />{" "}
          </Item>{" "}
          <Item>
            <StyledLink to="/products/face">Kasvot</StyledLink>{" "}
          </Item>{" "}
          <Item>
            <StyledLink to="/products/body">Vartalo</StyledLink>{" "}
          </Item>{" "}
          <Item>
            {" "}
            <StyledLink to="/products/professionals">
              Ammattilaisille
            </StyledLink>{" "}
          </Item>{" "}
        </Left>{" "}
        <Center>
          <StyledLink to="/">KOSMEDiK</StyledLink>{" "}
        </Center>{" "}
        <Right>
          {" "}
          <Item>
            <StyledLink to="/treatments">Hoidot</StyledLink>{" "}
          </Item>{" "}
          <Item>
            <StyledLink to="/trainings">Koulutukset</StyledLink>{" "}
          </Item>{" "}
          <Item>
            <StyledLink to="/about">Meistä</StyledLink>{" "}
          </Item>{" "}
          <Icons>
            {" "}
            <StyledLinkSearch to="/search" aria-label="Haku">
              <SearchIcon />{" "}
            </StyledLinkSearch>{" "}
            {isLoggedIn ? (
              <AccountWrapper ref={accountRef}>
                {" "}
                <AccountButton
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isAccountOpen}
                  aria-label={isPro ? "Pro-tili" : "Oma tili"}
                  onClick={() => setIsAccountOpen((p) => !p)}
                >
                  {" "}
                  {isPro ? <VerifiedUserIcon /> : <PersonIcon />}{" "}
                </AccountButton>{" "}
                {isAccountOpen && (
                  <AccountMenu>
                    {" "}
                    <AccountMenuItem
                      to="/account"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <span>Oma tili</span>
                      {isPro && <ProTag>PRO</ProTag>}{" "}
                    </AccountMenuItem>{" "}
                    <AccountMenuItem
                      to="/orders"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <span>Omat tilaukset</span>{" "}
                    </AccountMenuItem>{" "}
                    <AccountMenuItem
                      to="/account-bookings"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <span>Omat varaukset</span>{" "}
                    </AccountMenuItem>
                    <AccountMenuDivider />{" "}
                    <LogoutButton type="button" onClick={handleLogout}>
                      Kirjaudu ulos{" "}
                    </LogoutButton>{" "}
                  </AccountMenu>
                )}{" "}
              </AccountWrapper>
            ) : (
              <StyledLinkSearch to="/login" aria-label="Kirjaudu sisään">
                <PersonOutlineIcon />{" "}
              </StyledLinkSearch>
            )}{" "}
            <DesktopOnly>
              {" "}
              <StyledLinkSearch to="/contact" aria-label="Yhteystiedot">
                <MailOutlineIcon />{" "}
              </StyledLinkSearch>{" "}
            </DesktopOnly>
            {/* CART */}{" "}
            <CartWrap>
              {" "}
              <IconBtn
                ref={cartBtnRef}
                type="button"
                aria-label="Ostoskori"
                onClick={() => setShowCart((p) => !p)}
              >
                <ShoppingCartOutlinedIcon />{" "}
              </IconBtn>{" "}
              {products.length > 0 && <Circle>{products.length}</Circle>}{" "}
              {showCart && (
                <Cart
                  anchorRef={cartBtnRef}
                  onClose={() => setShowCart(false)}
                />
              )}{" "}
            </CartWrap>{" "}
          </Icons>{" "}
        </Right>{" "}
      </Wrapper>{" "}
    </NavbarContainer>
  );
};
export default Navbar;
