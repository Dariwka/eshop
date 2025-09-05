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

const List = ({ subCats = [], maxPrice, prodSort, catId }) => {
  const isNumeric = /^\d+$/.test(String(catId));

  const base = isNumeric
    ? `&filters[categories][id][$eq]=${catId}`
    : `&filters[categories][slug][$eq]=${catId}`;

  const subCatsFilter =
    subCats.length > 0
      ? subCats.map((id) => `&filters[sub_categories][id][$eq]=${id}`).join("")
      : "";

  const url =
    "/products?" +
    "fields[0]=title&fields[1]=price&fields[2]=oldPrice&fields[3]=isNew&fields[4]=isSale&fields[5]=isPopular&fields[6]=slug" +
    "&populate[img][fields][0]=url&populate[img2][fields][0]=url" +
    `${base}` +
    `${subCatsFilter}` +
    `&filters[price][$lte]=${maxPrice}` +
    `&sort=price:${prodSort}` +
    "&pagination[page]=1&pagination[pageSize]=24";

  /* const url =
    `/products?populate=*` +
    `&${base}` +
    `${subCatsFilter}` +
    `&filters[price][$lte]=${maxPrice}` +
    `&sort=price:${prodSort}`;*/

  /*const { data, loading } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats?.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${prodSort}`
  );*/

  const { data, loading, error } = useFetch(url);

  return (
    <ListContainer>
      {error ? (
        "Something went wrong"
      ) : loading ? (
        <LoadingButton loading={loading} />
      ) : (
        data?.map((item) => <Card item={item} key={item.id} />)
      )}
    </ListContainer>
  );
};

export default List;
