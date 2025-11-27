import React, { useState } from "react";
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

const LoadMoreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 24px 0 40px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 24px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background-color: white;
  color: #111827;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: #111827;
    color: #ffffff;
    border-color: #111827;
  }
`;

const List = ({ subCats = [], maxPrice, prodSort, catId }) => {
  // сколько товаров показываем сейчас (страница всегда 1)
  const [pageSize, setPageSize] = useState(24);
  const isNumeric = /^\d+$/.test(String(catId));
  const base = isNumeric
    ? `&filters[categories][id][$eq]=${catId}`
    : `&filters[categories][slug][$eq]=${catId}`;
  const subCatsFilter =
    subCats.length > 0
      ? subCats.map((id) => `&filters[sub_categories][id][$eq]=${id}`).join("")
      : "";
  // добавили isPro, proPrice, contactPrice //

  const url =
    "/products?" +
    "fields[0]=title" +
    "&fields[1]=price" +
    "&fields[2]=oldPrice" +
    "&fields[3]=isNew" +
    "&fields[4]=isSale" +
    "&fields[5]=isPopular" +
    "&fields[6]=slug" +
    "&fields[7]=isPro" +
    "&fields[8]=proPrice" +
    "&fields[9]=contactPrice" +
    "&populate[img][fields][0]=url" +
    "&populate[img2][fields][0]=url" +
    base +
    subCatsFilter +
    `&filters[price][$lte]=${maxPrice}` +
    `&sort=price:${prodSort}` +
    `&pagination[page]=1&pagination[pageSize]=${pageSize}`;

  const { data, loading, error } = useFetch(url);
  const handleLoadMore = () => {
    setPageSize((prev) => prev + 24);
  };
  const isArray = Array.isArray(data);
  const canLoadMore = !loading && !error && isArray && data.length === pageSize;
  return (
    <ListContainer>
           {" "}
      {error ? (
        "Something went wrong"
      ) : loading && !isArray ? (
        <LoadingButton loading={loading} />
      ) : (
        <>
                   {" "}
          {isArray && data.map((item) => <Card item={item} key={item.id} />)}   
               {" "}
          {canLoadMore && (
            <LoadMoreWrapper>
                           {" "}
              <LoadMoreButton onClick={handleLoadMore}>
                                Näytä lisää             {" "}
              </LoadMoreButton>
                         {" "}
            </LoadMoreWrapper>
          )}
                 {" "}
        </>
      )}
         {" "}
    </ListContainer>
  );
};
export default List;
