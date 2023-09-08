import React, { useState } from "react";
import "./Course.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ModeIcon from "@mui/icons-material/Mode";
import TrainingBooking from "../../components/TrainingBooking/TrainingBooking";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const Course = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");

  const { data, loading } = useFetch(`/courses/${id}?populate=*`);

  const [show, setShow] = useState(false);

  const trainingHandler = () => {
    setShow(!show);
  };

  return (
    <div className="course">
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={data?.attributes?.img?.data?.attributes.url}
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={data?.attributes?.img2?.data?.attributes.url}
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={data?.attributes[selectedImg]?.data?.attributes.url}
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
            <button className="add" onClick={trainingHandler}>
              <ModeIcon /> BOOK
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
      {show && (
        <TrainingBooking
          trainingTime={data?.attributes?.time.split(":00.000")[0]}
          trainingTitle={data?.attributes?.title}
          trainingDate={data?.attributes?.date}
          close={trainingHandler}
        />
      )}
    </div>
  );
};

export default Course;
