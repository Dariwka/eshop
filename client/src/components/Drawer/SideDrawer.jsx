import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import "./SideDrawer.css";

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ["sidedrawer"];

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to="/products/1">Face</Link>
        </li>
        <li>
          <Link to="/products/2">Body</Link>
        </li>
        <li>
          <Link to="/treatments">Treatments</Link>
        </li>
        <li>
          <Link to="/trainings">Trainings</Link>
        </li>
        <li>
          <Link to="/professionals">Professionals</Link>
        </li>
        <li>
          <a href="https://www.posti.fi/en/private/parcels-and-tracking">
            Order Tracking
          </a>
        </li>
        <li>
          <Link to="/terms">Terms</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
