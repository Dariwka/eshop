import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="img/en.png" alt="flag" />
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
            <Link className="link" to="/products/3">
              Professionals
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/4">
              Devices
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
            <Link className="link" to="/courses">
              Courses
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/brands">
              Brands
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Contact
            </Link>
          </div>
          <div className="icons">
            <SearchIcon />
            <PersonOutlineIcon />
            <FavoriteBorderIcon />
            <div className="cartIcon">
              <ShoppingCartOutlinedIcon />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
