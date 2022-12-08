import React from "react";
import "./WishList.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const WishList = () => {
  return (
    <div className="wishlist">
      <h1>Products or Treatments in your Wish List</h1>
      <div className="item">
        <img
          src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669811384/kosmedik/BB-Glow8-819x1024_n2ngha.png"
          alt=""
        />
        <div className="details">
          <h1>Dermapen Treatment</h1>
          <div className="price">1 x €19.99</div>
        </div>
        <button className="add">
          <AddShoppingCartIcon /> ADD TO CART
        </button>
        <DeleteOutlinedIcon />
      </div>
    </div>
  );
};

export default WishList;
