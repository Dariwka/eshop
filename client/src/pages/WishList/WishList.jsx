import React from "react";
import "./WishList.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishList } from "../../redux/wishReducer";
import { addToCart } from "../../redux/cartReducer";

const WishList = () => {
  const wishProducts = useSelector((state) => state.wishList.wishProducts);
  console.log(wishProducts);

  const dispatch = useDispatch();
  return (
    <div className="wishlist">
      <h1>Products or Treatments in your Wish List</h1>
      {wishProducts?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <div className="price">
              {item.quantity} x €{item.price}
            </div>
          </div>
          <button
            className="add"
            onClick={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  title: item.attributes.title,
                  desc: item.attributes.desc,
                  price: item.attributes.price,
                  img: item.attributes.img.item.attributes.url,
                  guantity: item.quantity,
                })
              )
            }
          >
            <AddShoppingCartIcon /> ADD TO CART
          </button>
          <DeleteOutlinedIcon
            onClick={() => dispatch(removeFromWishList(item.id))}
          />
        </div>
      ))}
    </div>
  );
};

export default WishList;
