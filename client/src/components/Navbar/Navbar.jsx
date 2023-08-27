import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);

  const [open, setOpen] = useState(false);

  //const componentRef = useRef();

  const menuCloseOpenHandler = () => {
    setOpen(!open);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
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
            <Link className="link" to="/training">
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
            <SearchIcon />
            <div className="cartIcon">
              <ShoppingCartOutlinedIcon onClick={menuCloseOpenHandler} />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
