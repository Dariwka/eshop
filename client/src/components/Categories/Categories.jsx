import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669808813/kosmedik/karelys-ruiz-rYardnw9lno-unsplash_qqrkl0.jpg"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Face
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669809025/kosmedik/fuu-j-Fu7RNjl-pW0-unsplash_ftyozi.jpg"
            alt=""
          />
          <button>
            <Link className="link" to="/products/2">
              Body
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669811384/kosmedik/BB-Glow8-819x1024_n2ngha.png"
            alt=""
          />
          <button>
            <Link className="link" to="/products/3">
              Courses
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1653594092/kosmedik/meso_face_fjofzr.jpg"
                alt=""
              />
              <button>
                <Link className="link" to="/products/4">
                  Mesotherapy
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <img
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1653590898/kosmedik/radio_frequency_body_rb6g4r.jpg"
                alt=""
              />
              <button>
                <Link className="link" to="/products/5">
                  Slimming
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669810104/kosmedik/med_gels_dermedics_wdaqr7.png"
            alt=""
          />
          <button>
            <Link className="link" to="/products/6">
              Professionals
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
