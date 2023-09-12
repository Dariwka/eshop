import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./SearchFilter.scss";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const SearchFilter = () => {
  const { data, loading, error } = useFetch(`/sub-categories?populate=*`);
  //filter
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [prodSort, setProdSort] = useState("asc");

  // console.log("values", prodSort, maxPrice, selectedSubCats);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  const resetHandler = () => {
    //console.log("click");
  };

  return (
    <div className="rightRow">
      <div className="rightModule">
        <h3>Filters</h3>
        <button className="resetButton" onClick={resetHandler}>
          reset
        </button>
        <div className="moduleBody">
          <h2>Product Categories</h2>
          <div className="filterItem">
            {error ? (
              "Something went wrong"
            ) : loading ? (
              <LoadingButton loading={loading} />
            ) : (
              data?.map((item) => (
                <div className="inputItem" key={item.id}>
                  <input
                    type="checkbox"
                    id={item.id}
                    value={item.attributes.title}
                    onChange={handleChange}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))
            )}
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
                value={prodSort}
                name="price"
                onChange={(e) => setProdSort("asc")}
              />
              <label htmlFor="asc">Price (Lowest First)</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setProdSort("desc")}
              />
              <label htmlFor="desc">Price (Highest First)</label>
            </div>
          </div>
          <div className="panelGroup">
            <div className="moduleItem"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
