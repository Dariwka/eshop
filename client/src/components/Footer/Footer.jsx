import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Face</span>
          <span>Body</span>
          <span>Professionals</span>
          <span>Devices</span>
          <span>New Arrivals</span>
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
          <span>FAQ</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos
            sapiente saepe ex nobis soluta voluptate, et enim aliquid quo
            accusamus iusto iste ad autem corporis, modi minus? Et, odio.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos
            sapiente saepe ex nobis soluta voluptate, et enim aliquid quo
            accusamus iusto iste ad autem corporis, modi minus? Et, odio.
          </span>
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
