import React from "react";
import { Link } from "react-router-dom";

const ListSearch = ({ product }) => {
  console.log(product);
  return (
    <>
      <div className="list">
        <Link className="link">
          <div className="card">
            <div className="image">
              <span>New Season</span>
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1693831306/dermedics_ACNE_roll_on_15ml_bottle_aae0612efa.jpg"
                alt=""
                className="mainImg"
              />
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1693831306/dermedics_ACNE_roll_on_15ml_box_3b90f8656a.jpg"
                alt=""
                className="secondImg"
              />
            </div>
            <h2>Serum</h2>
            <div className="prices">
              <h3>€20</h3>
              <h3>€50</h3>
            </div>
          </div>
        </Link>
      </div>
      <div className="list">
        <Link className="link">
          <div className="card">
            <div className="image">
              <span>New Season</span>
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1693831306/dermedics_ACNE_roll_on_15ml_bottle_aae0612efa.jpg"
                alt=""
                className="mainImg"
              />
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1693831306/dermedics_ACNE_roll_on_15ml_box_3b90f8656a.jpg"
                alt=""
                className="secondImg"
              />
            </div>
            <h2>Serum</h2>
            <div className="prices">
              <h3>€20</h3>
              <h3>€50</h3>
            </div>
          </div>
        </Link>
      </div>
      <div className="list">
        <Link className="link">
          <div className="card">
            <div className="image">
              <span>New Season</span>
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1693831306/dermedics_ACNE_roll_on_15ml_bottle_aae0612efa.jpg"
                alt=""
                className="mainImg"
              />
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1693831306/dermedics_ACNE_roll_on_15ml_box_3b90f8656a.jpg"
                alt=""
                className="secondImg"
              />
            </div>
            <h2>Serum</h2>
            <div className="prices">
              <h3>€20</h3>
              <h3>€50</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ListSearch;
