import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Cart = () => {
  const data = [
    {
      id: 1,
      img: "https://res.cloudinary.com/lvimeridijan/image/upload/v1653638944/kosmedik/dermedics_CALM_roll-on_15ml_txf3z2.png",
      img2: "https://res.cloudinary.com/lvimeridijan/image/upload/v1653638944/kosmedik/dermedics_CALM_roll-on_15ml_box_1_dckssg.png",
      title: "CALM Instant Relief Eye Serum",
      isNew: true,
      volume: 15,
      oldPrice: 23,
      price: 16,
      desc: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803259/kosmedik/dermedics_ACNE_roll-on_15ml_bottle_eyvc08.png",
      img2: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803259/kosmedik/dermedics_ACNE_roll-on_15ml_box_hes7tq.png",
      title: "Anti Acne Roll-On Serum",
      isNew: true,
      volume: 15,
      oldPrice: 23,
      price: 16,
      desc: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803439/kosmedik/dermedics_HYDRA_eye_cream_15ml_bottle_dseqr7.png",
      img2: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803439/kosmedik/dermedics_HYDRA_eye_cream_15ml_box_purszy.png",
      title: "HYDRA Eye Cream Deluxe",
      isNew: false,
      volume: 15,
      oldPrice: 54,
      price: 48,
      desc: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {data?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">1 x €{item.price}</div>
          </div>
          <DeleteOutlinedIcon className="delete" />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>€19.9</span>
      </div>
      <button>PROCEED TO CHECKOUT</button>
      <span className="reset">Reset Cart</span>
    </div>
  );
};

export default Cart;
