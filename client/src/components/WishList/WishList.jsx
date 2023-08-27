import React from "react";
import "./WishList.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromWishList,
  resetWishList,
} from "../../redux/cartReducer";

const WishList = () => {
  const wishList = useSelector((state) => state.cart.wishList) || [];

  const dispatch = useDispatch();

  return (
    <div className="wishList">
      <h1>Products in your Wish List</h1>
      {wishList?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.price}€</p>
            <div className="price">
              {item.quantity} x €{item.price}
            </div>
          </div>
          <AddShoppingCartIcon
            className="add"
            onClick={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  desc: item.desc,
                  img: item.img,
                  quantity: item.quantity,
                })
              ) && dispatch(removeFromWishList(item.id))
            }
          />
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeFromWishList(item.id))}
          />
        </div>
      ))}
      <button>ADD ALL TO SHOPPING CART</button>
      <span className="reset" onClick={() => dispatch(resetWishList())}>
        Reset Wish List
      </span>
    </div>
  );
};

export default WishList;
