import React from "react";
import Update from "../../components/UserPage/Update/Update";
import LeftBar from "../../components/UserPage/LeftBar/LeftBar";
import RightBar from "../../components/UserPage/RightBar/RightBar";
import "./UserPage.scss";

const UserPage = () => {
  return (
    <div className="userContainer">
      <LeftBar />
      <Update />
      <RightBar />
    </div>
  );
};

export default UserPage;
