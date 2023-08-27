import React, { useState } from "react";
import "./Professionals.scss";
import useFetch from "../../hooks/useFetch";
import ListProf from "../../components/ListProf/ListProf";

const Professionals = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [profSort, setProfSort] = useState("asc");

  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(`/sub-prof-categories?populate=*`);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="professionals">
      <div className="left">
        <div className="filterProf">
          <h2>Categories</h2>
          {error
            ? "Something went wrong"
            : loading
            ? "loading ..."
            : data?.map((item) => (
                <div className="inputItem" key={item.id}>
                  <input
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    onChange={handleChange}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
        </div>
        <div className="filterProf">
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
        <div className="filterProf">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setProfSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setProfSort("desc")}
            />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669809025/kosmedik/engin-akyurt-ZbzYDboN7fg-unsplash_2_h0fmb3.jpg"
          alt=""
          className="catImg"
        />
        <ListProf
          maxPrice={maxPrice}
          subCatsProf={selectedSubCats}
          profSort={profSort}
        />
      </div>
    </div>
  );
};

export default Professionals;
