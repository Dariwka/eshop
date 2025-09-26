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
  gap: 12px;
  ${mobile({ flexDirection: "column" })}
`;
const ListCourse = ({
  subCatsCourse = [],
  maxPrice = 99999,
  courseSort = "asc",
}) => {
  // точечно запрашиваем нужные поля + populate
  //
  const fields = `fields[0]=title&fields[1]=price&fields[2]=slug&fields[3]=isNew&fields[4]=isPopular`;
  const populate = `populate[img][fields][0]=url&populate[img2][fields][0]=url`;
  const filtersCats = subCatsCourse
    .map((id) => `filters[sub_course_categories][id][$eq]=${id}`)
    .join("&");
  const url =
    `/courses?${fields}&${populate}` +
    (filtersCats ? `&${filtersCats}` : "") +
    `&filters[price][$lte]=${maxPrice}&sort=price:${courseSort}`;

  const { data, loading, error } = useFetch(url);
  if (error) return <div>Failed to load</div>;
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];
  return (
    <ListCourseContainer>
      {loading ? (
        <LoadingButton loading />
      ) : (
        list.map((item) => <CardCourse item={item} key={item.id} />)
      )}
    </ListCourseContainer>
  );
};
export default ListCourse;
