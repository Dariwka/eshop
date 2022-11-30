import React, { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import "./Products.scss";

const Products = () => {
  //const param = useParams();
  //console.log(param);

  const catId = parseInt(useParams().id);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          <div className="inputItem">
            <input type="checkbox" id="1" value={1} />
            <label htmlFor="1">Cleansing</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="2" value={2} />
            <label htmlFor="2">Creams</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="3" value={3} />
            <label htmlFor="3">Serums</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="4" value={4} />
            <label htmlFor="4">Ampoules</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="5" value={5} />
            <label htmlFor="5">Slimming</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="6" value={6} />
            <label htmlFor="6">Masks</label>
          </div>
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              pnChange={(e) => setSort("desc")}
            />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id="desc" value="desc" name="price" />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669814558/kosmedik/-_dermedics_proportions_of_packages_1_bv9otn.png"
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} />
      </div>
    </div>
  );
};

export default Products;
