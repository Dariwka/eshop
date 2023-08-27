import React, { useState } from "react";
import "./Treatment.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { addToWishList, removeFromWishList } from "../../redux/cartReducer";

import { useDispatch } from "react-redux";

const Treatment = () => {
  const id = useParams().id;
  const [icon, setIcon] = useState(<FavoriteBorderIcon />);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [selectedImg, setSelectedImg] = useState("img");

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { data, loading } = useFetch(`/treatments/${id}?populate=*`);
  console.log("treatments", data);

  const wishListHandler = () => {
    console.log("onClick", data);
    dispatch(
      addToWishList({
        id: data.id,
        title: data.attributes.title,
        desc: data.attributes.desc,
        price: data.attributes.price,
        img: data.attributes.img.data.attributes.url,
        quantity: 1,
      })
    );
    setIsIconClicked(!isIconClicked);
    setIcon(<FavoriteIcon />);
  };
  return (
    <div className="treatment">
      {loading ? (
        "loading..."
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes?.img?.data?.attributes.url
                }
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes?.img2?.data?.attributes.url
                }
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes[selectedImg]?.data?.attributes.url
                }
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">€{data?.attributes?.price}</span>
            <div className="time">
              <AccessTimeOutlinedIcon />
              {data?.attributes?.duration} min
            </div>

            <p>{data?.attributes?.info}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button className="add">
              <CalendarMonthIcon /> Booking a treatment
            </button>
            <div className="links">
              <div className="heart" onClick={wishListHandler}>
                {icon} ADD TO WISH LIST
              </div>
            </div>
            <div className="info">
              <hr />
              <span>Area: Body</span>
              <span>Goal: Lifting, Slimming</span>
              <span>Tags: cavitation, body, lifting</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Treatment;
