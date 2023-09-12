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
          <Link href="/">
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link href="/products/1">Face</Link>
        </li>
        <li>
          <Link href="/products/2">Body</Link>
        </li>
        <li>
          <Link href="/treatments">Treatments</Link>
        </li>
        <li>
          <Link href="/trainings">Trainings</Link>
        </li>
        <li>
          <Link href="https://www.posti.fi/en/private/parcels-and-tracking">
            Order Tracking
          </Link>
        </li>
        <li>
          <Link href="/terms">Terms</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
