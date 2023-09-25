import React from "react";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import { mobile } from "../../responsive";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;

const List = ({ subCats, maxPrice, prodSort, catId }) => {
  const { data, loading } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats?.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${prodSort}`
  );

  return (
    <ListContainer>
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        data?.map((item) => <Card item={item} key={item.id} />)
      )}
    </ListContainer>
  );
};

export default List;
