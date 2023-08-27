import React, { useState } from "react";
import "./Professional.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const Professional = () => {
  const id = useParams().id;
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState("img");

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { data, loading } = useFetch(`/professionals/${id}?populate=*`);

  console.log("prof", data);

  return (
    <div className="professional">
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
            <p>{data?.attributes?.desc}</p>
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
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="info">
              <hr />
              <span>Availability: {data?.attributes?.stock}</span>
              <span>
                Brand: {data?.attributes?.brand?.data[0].attributes?.title}
              </span>
              <span>Area: {data?.attributes?.area}</span>
              <span>Goal: {data?.attributes?.goal}</span>
              <span>Tag: {data?.attributes?.tags}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Professional;
