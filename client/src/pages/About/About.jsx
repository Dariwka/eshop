import React from "react";
import "./About.scss";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

const About = () => {
  return (
    <div className="containerAbout">
      {/* <img
        src="https://res.cloudinary.com/lvimeridijan/image/upload/v1692861574/kosmedik/kosmedik_2_es9pgs.jpg"
        alt=""
      /> */}
      <div className="wrapper">
        <div className="textContainer">
          <h1>Welcome our Dear Guest!</h1>
          <h2>
            Firstly we would like to wish you a pleasant shopping in our Online
            Store! <LoyaltyIcon />
          </h2>
          <p>
            KosmeDiK tmi is beauty room, located in Helsinki, Kannelmäki. Our
            address - Klaneettitie 6A 2 floor. Helsinki. Near of us you can find
            2 hours free parking.
          </p>
          <p>
            We offer a wide range of services in professional and machine
            cosmetology as well as aesthetic medicine.
          </p>
          <ul>
            <li>Cavitation treatment</li>
            <li>Radio Frequency</li>
            <li>Vacuum</li>
            <li>Microneedling treatment</li>
            <li>Pressotherapy with infrared sauna</li>
            <li>CryoLipolysis</li>
            <li>Electroporation</li>
            <li>Ultrasound</li>
            <li>Diamond dermabrasion</li>
            <li>Darsenval</li>
            <li>Face cleansing</li>
            <li>Problematic skin care</li>
            <li>Chemical peels</li>
          </ul>
          <p>
            More than 10 years we are distributor of Dermedics brand. DERMEDICS™
            offers medical gels, professional dermocosmetics and digital devices
            for aesthetic medicine treatments which are produced in accordance
            with European Union directives and standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
