import React from "react";
import { Link } from "react-router-dom";
import "./CardCourse.scss";

const CardCourse = ({ item }) => {
  return (
    <Link className="link" to={`/training/${item.id}`}>
      <div className="cardCourse">
        <div className="image">
          {item?.attributes.isNew && <span className="new">New </span>}
          {item?.attributes.isPopular && (
            <span className="popular">Popular </span>
          )}
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item.attributes?.img?.data?.attributes?.url
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          <h3>€{item.oldPrice || item?.attributes.price + 20}</h3>
          <h3>€{item?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CardCourse;
