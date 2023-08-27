import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import WishList from "../WishList/WishList";

const Navbar = ({ name }) => {
  const products = useSelector((state) => state.cart.products);

  console.log("products", products);

  const wishList = useSelector((state) => state.cart.wishList);

  console.log("wished", wishList);

  const [open, setOpen] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);

  //const componentRef = useRef();

  const menuCloseOpenHandler = () => {
    setOpen(!open);
  };
  const wishCloseOpenHandler = () => {
    setOpenWishList(!openWishList);
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
            <div className="item">
              <Link className="link" to="/user/1">
                <PersonOutlineIcon />
                <span>{name}</span>
              </Link>
            </div>
            <div className="cartIcon">
              <FavoriteBorderIcon onClick={wishCloseOpenHandler} />
              <span>{wishList.length}</span>
            </div>
            <div className="cartIcon">
              <ShoppingCartOutlinedIcon onClick={menuCloseOpenHandler} />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
      {openWishList && <WishList />}
    </div>
  );
};

export default Navbar;
