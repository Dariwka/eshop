import React, { useState } from "react";
import "./SearchPage.scss";
import ListSearch from "../../components/ListSearch/ListSearch";
import useFetch from "../../hooks/useFetch";

const SearchPage = () => {
  const { data } = useFetch(`/searches?populate=*`);
  console.log("data", data);
  const [products, setProducts] = useState(data);
  const [searchVal, setSearchVal] = useState("");

  console.log("products", products);

  const searchHandler = () => {
    console.log("search");
    // if (searchVal === "") {
    //   setProducts(data);
    //   return;
    // }
    // const filterBySearch = data.filter((item) => {
    //   if (item.toLowerCase().includes(searchVal.toLowerCase())) {
    //     return item;
    //   }
    // });
    // setProducts(filterBySearch);
  };
  return (
    <div className="searchPageContainer">
      <div className="left">
        <div className="top">
          <div className="wrapperSearchPage">
            <h1>Search</h1>
            <div className="inputBar">
              <input
                type="text"
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <select name="category" id="">
                <option value=""></option>
              </select>
              <button onClick={searchHandler}>Search</button>
            </div>
          </div>
        </div>
        <div className="bottom">
          {products?.map((product) => {
            return <ListSearch product={product} key={product.id} />;
          })}
        </div>
      </div>
      <div className="right">
        <div className="rightRow">
          <div className="rightModule">
            <h3>Filters</h3>
            <button>reset</button>
            <div className="moduleBody">
              <div className="panelGroup">
                <div className="moduleItem"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
