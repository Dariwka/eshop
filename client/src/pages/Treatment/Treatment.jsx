import React, { useState } from "react";
import "./Treatment.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookingForm from "../../components/Booking/BookingForm";

const Treatment = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const { data, loading } = useFetch(`/treatments/${id}?populate=*`);

  //booking
  const [open, setOpen] = useState(false);

  const bookingOpenHandler = () => {
    setOpen(!open);
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
            <button className="add" onClick={bookingOpenHandler}>
              <CalendarMonthIcon /> Booking a treatment
            </button>

            <div className="info">
              <hr />
              <span>Area: {data?.attributes?.area}</span>
              <span>Goal: {data?.attributes?.goal}</span>
              <span>Tags: {data?.attributes?.tags}</span>
            </div>
          </div>
        </>
      )}
      {open && (
        <BookingForm
          treatment={data?.attributes?.title}
          close={bookingOpenHandler}
        />
      )}
    </div>
  );
};

export default Treatment;
