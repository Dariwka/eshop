import React, { useState } from "react";
import "./Course.scss";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeIcon from "@mui/icons-material/Mode";

const Course = () => {
  const id = useParams().id;
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState("img");

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { data, loading } = useFetch(`/courses/${id}?populate=*`);
  console.log("course", data);

  return (
    <div className="course">
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
            <div className="time" type="date">
              <CalendarMonthIcon />
              {data?.attributes?.date.split("-").reverse().join("/")}
            </div>
            <div className="time" type="time">
              <AccessTimeIcon />
              {data?.attributes?.time.split(":00.000")[0]}
            </div>

            <p>{data?.attributes?.desc}</p>
            <button className="add">
              <ModeIcon /> BOOK
            </button>
            <div className="links">
              <div className="heart">
                {show ? <FavoriteIcon /> : <FavoriteBorderIcon />}ADD TO WISH
                LIST
              </div>
            </div>
            <div className="info">
              <hr />
              <span>Area: {data?.attributes?.area}</span>
              <span>Goal: {data?.attributes?.goal}</span>
              <span>Tags: {data?.attributes?.tags}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
