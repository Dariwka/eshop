import React, { useState } from "react";
import ListCourse from "../../components/ListCourse/ListCourse";
import "./Courses.scss";
import useFetch from "../../hooks/useFetch";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const Courses = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [courseSort, setCourseSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(
    `/sub-course-categories?populate=*`
  );

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
    <div className="courses">
      <div className="left">
        <div className="filterCourse">
          <h2>Training's Categories</h2>
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
                  value={item.id}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
            ))
          )}
        </div>
        <div className="filterCourse">
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
        <div className="filterCourse">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setCourseSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setCourseSort("desc")}
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
        <ListCourse
          maxPrice={maxPrice}
          subCatsCourse={selectedSubCats}
          courseSort={courseSort}
        />
      </div>
    </div>
  );
};

export default Courses;
