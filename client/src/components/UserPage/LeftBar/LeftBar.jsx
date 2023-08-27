import React from "react";
import "./LeftBar.scss";
import MenuLink from "../../UserPage/MenuLink/MenuLink";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const LeftBar = () => {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <MenuLink icon={<HomeOutlinedIcon />} text="HomePage" />
        <MenuLink icon={<ShoppingBasketOutlinedIcon />} text="Orders" />
        <MenuLink icon={<FavoriteBorderOutlinedIcon />} text="Wish List" />
        <MenuLink icon={<AccessTimeOutlinedIcon />} text="Schedule" />
        <MenuLink icon={<SettingsOutlinedIcon />} text="Settings" />
        <MenuLink icon={<LogoutOutlinedIcon />} text="Logout" />
      </div>
    </div>
  );
};

export default LeftBar;
