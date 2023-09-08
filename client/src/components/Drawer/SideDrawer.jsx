import HomeIcon from "@mui/icons-material/Home";
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
          <a href="/">
            <HomeIcon />
          </a>
        </li>
        <li>
          <a href="/products/1">Face</a>
        </li>
        <li>
          <a href="/products/2">Body</a>
        </li>
        <li>
          <a href="/treatments">Treatments</a>
        </li>
        <li>
          <a href="/trainings">Trainings</a>
        </li>
        <li>
          <a href="https://www.posti.fi/en/private/parcels-and-tracking">
            Order Tracking
          </a>
        </li>
        <li>
          <a href="/terms">Terms</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
        <li>
          <a href="/contact">Contact Us</a>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
