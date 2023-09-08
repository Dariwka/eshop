import React, { useState } from "react";
import "./SearchPage.scss";
//import ListSearch from "../../components/ListSearch/ListSearch";
import useFetch from "../../hooks/useFetch";
import ListSearch from "../../components/ListSearch/ListSearch";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

const SearchPage = () => {
  const { data, loading } = useFetch(`/products?populate=*`);
  const [products, setProducts] = useState(data);
  const [searchVal, setSearchVal] = useState("");

  console.log("products", products);

  const filterByCategory = products
    ?.map((el) => el.sub_categories)
    .filter((sub) => sub.data[0].attributes.title === "Creams");

  console.log("CATEGORY", filterByCategory);

  //search
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchVal === "") {
      setProducts(data);
      return;
    }
    const filterBySearch = data
      ?.map((item) => item?.attributes)
      .filter((item) => {
        if (
          item?.desc?.toLowerCase().includes(searchVal.toLowerCase()) ||
          item?.title?.toLowerCase().includes(searchVal.toLowerCase()) ||
          item?.categories?.data[0]?.attributes?.title
            .toLowerCase()
            .includes(searchVal.toLowerCase())
        ) {
          return item;
        }
      });
    setProducts(filterBySearch);
  };

  return (
    <div className="searchPageContainer">
      <div className="leftSearch">
        <div className="top">
          <form className="wrapperSearchPage" onSubmit={searchHandler}>
            <h1>Search</h1>
            <div className="inputBar">
              <input
                required
                type="text"
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
        <div className="bottom">
          {loading ? (
            <LoadingButton loading={loading} />
          ) : (
            products?.map((product) => {
              return <ListSearch product={product} key={product.id} />;
            })
          )}
        </div>
      </div>
      <div className="rightSearch">
        <SearchFilter />
      </div>
    </div>
  );
};

export default SearchPage;
