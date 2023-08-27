import React from "react";
import "./ListCourse.scss";
import useFetch from "../../hooks/useFetch";
import CardCourse from "../CardCourse/CardCourse";

const ListCourse = ({ subCatsCourse, maxPrice, courseSort }) => {
  const { data, loading } = useFetch(
    `/courses?populate=*&${subCatsCourse?.map(
      (item) => `&[filters][sub_course_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${courseSort}`
  );

  console.log("course", data);

  console.log("categ", subCatsCourse);

  return (
    <div className="listCourse">
      {loading
        ? "loading..."
        : data?.map((item) => <CardCourse item={item} key={item.id} />)}
    </div>
  );
};

export default ListCourse;
