import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Treatments.scss";

const Treatments = () => {
  // const [maxPrice, setMaxPrice] = useState(1000);
  const { data, loading, error } = useFetch(`/sub-treat-categories?populate=*`);
  console.log(data);

  return (
    <div className="treatments">
      <div className="left">
        <div className="filterTreat">
          <h2>Treatment Categories</h2>
          {error
            ? "Something went wrong"
            : loading
            ? "loading ..."
            : data?.map((item) => (
                <div className="inputItem" key={item.id}>
                  <input type="checkbox" id={item.id} value={item.id} />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
        </div>
        <div className="filterTreat">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input type="range" min={0} max={1000} />
            <span>1000</span>
          </div>
        </div>
        <div className="filterTreat">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input type="radio" id="asc" value="asc" name="price" />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id="desc" value="desc" name="price" />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Treatments;
