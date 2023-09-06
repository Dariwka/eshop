import React, { useState, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import SearchBar from "../Search/SearchBar";

const Navbar = ({ click }) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const openButtonRef = useRef();

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="hamburgerMenu" onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="left">
          <div className="item">
            <img src="/img/en.png" alt="flag" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>EUR</span>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link className="link" to="/products/1">
              Face
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/2">
              Body
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/professionals">
              Professionals
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            KOSMEDiK
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" to="/treatments">
              Treatments
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/trainings">
              Trainings
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/about">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/contact">
              Contact
            </Link>
          </div>
          <div className="icons">
            <SearchIcon
              onClick={() => {
                setShow((show) => !show);
              }}
            />

            <div className="cartIcon">
              <ShoppingCartOutlinedIcon
                ref={openButtonRef}
                onClick={() => {
                  setOpen((open) => !open);
                }}
              />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart open={openButtonRef} close={closeHandler} />}
      {show && <SearchBar />}
    </div>
  );
};

export default Navbar;
