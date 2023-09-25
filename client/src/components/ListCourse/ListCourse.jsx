import React from "react";
import useFetch from "../../hooks/useFetch";
import CardCourse from "../CardCourse/CardCourse";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ListCourseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;

const ListCourse = ({ subCatsCourse, maxPrice, courseSort }) => {
  const { data, loading } = useFetch(
    `/courses?populate=*&${subCatsCourse?.map(
      (item) => `&[filters][sub_course_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${courseSort}`
  );
  console.log("course", data);
  return (
    <ListCourseContainer>
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        data?.map((item) => <CardCourse item={item} key={item.id} />)
      )}
    </ListCourseContainer>
  );
};

export default ListCourse;
