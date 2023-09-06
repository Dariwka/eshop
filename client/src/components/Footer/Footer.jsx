import React from "react";
import "./Footer.scss";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Link } from "react-router-dom";

const Footer = () => {
  const showInMapClicked = () => {
    window.open("https://maps.google.com?q=" + 60.238074 + "," + 24.876132);
  };
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <div className="item">
            <Link className="link" to="/products/1">
              Face
            </Link>
            <Link className="link" to="/products/2">
              Body
            </Link>
            <Link className="link" to="/professionals">
              Professionals
            </Link>
            <Link className="link" to="/professional/2">
              Devices
            </Link>
            <Link className="link">New Arrivals</Link>
          </div>
        </div>
        <div className="item">
          <h1>Treatments</h1>
          <span>Face</span>
          <span>Body</span>
          <span>Slimming</span>
          <span>Mesotherapy</span>
          <span>SPECIAL OFFERS</span>
        </div>
        <div className="item">
          <h1>Courses</h1>
          <span>Mesotherapy</span>
          <span>Devices</span>
          <span>Peelings</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>Brands</span>
          <span>FAQ</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Ahti Pro Oy "KosmeDiK" is beauty room, shop and training center,
            located in Helsinki, Kannelmäki. <br />
            Y-tunnus: 3281350-8
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <Link className="link" onClick={showInMapClicked}>
            <RoomIcon style={{ marginRight: "10px" }} />
            Klaneettittie 6as, 2floor, Helsinki
          </Link>
          <a href="tel:+358400979610" className="link">
            <PhoneIcon style={{ marginRight: "10px" }} />
            0400979610
          </a>
          <a href="mailto:info@kosmedik.fi" className="link">
            <MailOutlineOutlinedIcon style={{ marginRight: "10px" }} />
            info@kosmedik.fi
          </a>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">KosmeDiK</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
