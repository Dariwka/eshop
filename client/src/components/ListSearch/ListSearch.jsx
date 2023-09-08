import React from "react";
import { Link } from "react-router-dom";

const ListSearch = ({ product }) => {
  console.log("", product);
  return (
    <>
      <div className="list">
        <Link className="link">
          <div className="card">
            <div className="image">
              {product?.isNew && <span>New Season</span>}
              {product?.isSale && <span>Special Offer</span>}
              <img
                src={product?.img?.data?.attributes?.url}
                alt=""
                className="mainImg"
              />
              <img
                src={product?.img2?.data?.attributes?.url}
                alt=""
                className="secondImg"
              />
            </div>
            <h2>{product.title}</h2>
            <div className="prices">
              <h3>€{product.oldPrice || product?.price + 20}</h3>
              <h3>€{product?.price}</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ListSearch;
