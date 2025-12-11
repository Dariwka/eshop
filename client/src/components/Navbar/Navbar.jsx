import React, { useState, useRef, useEffect } from "react";
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

/* ========== styled-компоненты ========== */

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
  ${mobile({
    fontSize: "24px",
    letterSpacing: "1.5px",
  })}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:visited,
  ​&:link {
    text-decoration: none;
  }

  &:hover,
  &:active {
    color: #0a7c5f; /* лёгкий зелёный акцент при ховере */
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
  cursor: pointer;
  gap: 18px;
  color: #777;

  svg {
    font-size: 22px;
  }
`;

const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
`;

const DesktopOnly = styled.div`
  display: flex;
  ${mobile({ display: "none" })};
`;

/* ==== дропдаун аккаунта ==== */

const AccountWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const AccountButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #777;

  svg {
    font-size: 26px;
  }
`;
const AccountMenu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  min-width: 230px;
  z-index: 300;
  padding: 8px 0;
  font-family: "Urbanist", sans-serif;
`;

const AccountMenuItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  font-size: 14px;
  text-decoration: none;
  color: #171717;

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
  padding: 2px 6px;
  border-radius: 999px;
  background-color: #0a7c5f;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

/* ========== компонент Navbar ========== */
const Navbar = ({ click }) => {
  const [showCart, setShowCart] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const cartButtonRef = useRef(null);
  const accountRef = useRef(null);
  const closeCart = () => {
    setShowCart(false);
  }; // получаем юзера
  //
  const user = getCurrentUser();
  const isLoggedIn = !!user;
  const isPro = !!user?.isPro;
  /* закрытие дропдауна аккаунта при клике вне */

  useEffect(() => {
    if (!isAccountOpen) return;
    const handleClickOutside = (event) => {
      if (!accountRef.current) return;
      if (!accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountOpen]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.setItem("logoutSuccess", "true");
    setIsAccountOpen(false);
    window.location.href = "/";
  };
  return (
    <NavbarContainer>
      <Wrapper>
        <HamburgerMenu onClick={click} aria-label="Avaa valikko">
          <div></div>
          <div></div>
          <div></div>
        </HamburgerMenu>
        <Left>
          <Item>
            <img src="/img/fi.png" alt="flag" />
            <KeyboardArrowDownIcon />         
          </Item>
          <Item>
            <StyledLink to="/products/face">Kasvot</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/products/body">Vartalo</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/products/professionals">
              Ammattilaisille
            </StyledLink>
          </Item>
        </Left>
        <Center>
          <StyledLink to="/">KOSMEDiK</StyledLink>
        </Center>
        <Right>
          <Item>
            <StyledLink to="/treatments">Hoidot</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/trainings">Koulutukset</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/about">Meistä</StyledLink>
          </Item>
          <Icons>
            <StyledLinkSearch to="/search" aria-label="Haku">
              <SearchIcon />
            </StyledLinkSearch>
            {isLoggedIn ? (
              <AccountWrapper ref={accountRef}>
                <AccountButton
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isAccountOpen}
                  aria-label={isPro ? "Pro-tili" : "Oma tili"}
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                >
                  {isPro ? <VerifiedUserIcon /> : <PersonIcon />}
                </AccountButton>{" "}
                {isAccountOpen && (
                  <AccountMenu>
                    <AccountMenuItem
                      to="/account"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <span>Oma tili</span>
                      {isPro && <ProTag>PRO</ProTag>}
                    </AccountMenuItem>
                    <AccountMenuItem
                      to="/orders"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <span>Omat tilaukset</span>
                    </AccountMenuItem>
                    <AccountMenuDivider />
                    <LogoutButton type="button" onClick={handleLogout}>
                      Kirjaudu ulos
                    </LogoutButton>
                  </AccountMenu>
                )}
              </AccountWrapper>
            ) : (
              <StyledLinkSearch to="/login" aria-label="Kirjaudu sisään">
                <PersonOutlineIcon />
              </StyledLinkSearch>
            )}
            <DesktopOnly>
              <StyledLinkSearch to="/contact" aria-label="Yhteystiedot">
                <MailOutlineIcon />
              </StyledLinkSearch>
            </DesktopOnly>
            <CartIcon>
              <ShoppingCartOutlinedIcon
                ref={cartButtonRef}
                onClick={() => {
                  setShowCart((prev) => !prev);
                }}
              />
              {products.length > 0 && <Circle>{products.length}</Circle>}
            </CartIcon>
          </Icons>
        </Right>
      </Wrapper>
      {showCart && <Cart open={cartButtonRef} close={closeCart} />}
    </NavbarContainer>
  );
};
export default Navbar;
