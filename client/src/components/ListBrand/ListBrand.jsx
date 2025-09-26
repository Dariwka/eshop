import React, { useMemo } from "react";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import useFetch from "../../hooks/useFetch";
import CardBrand from "../CardBrand/CardBrand";

/* ===== styles ===== */

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;
/* ===== helpers (Strapi query builder) ===== */ const makeUrl = (
  letter,
  q
) => {
  const params = [
    "fields[0]=title",
    "fields[1]=slug",
    "populate[img][fields][0]=url",
    "publicationState=live",
    "sort=title:asc",
    "pagination[page]=1",
    "pagination[pageSize]=100",
  ];
  if (letter && letter !== "All") {
    // чувствительно к регистру: D даст бренды на D
    //
    params.push(`filters[title][$startsWith]=${encodeURIComponent(letter)}`); // если нужно делать нечувствительно: поменяй на $startsWithi (Strapi >= 4.12)
  }
  if (q && q.trim()) {
    const s = encodeURIComponent(q.trim());
    params.push(`filters[$or][0][title][$containsi]=${s}`);
    params.push(`filters[$or][1][slug][$containsi]=${s}`);
  }
  return `/brands?${params.join("&")}`;
};
/* ===== component ===== */

const ListBrand = ({ letter = "All", q = "" }) => {
  const url = useMemo(() => makeUrl(letter, q), [letter, q]);
  const { data, loading, error } = useFetch(url);
  if (error) return <div>Something went wrong</div>;
  if (loading) return <LoadingButton loading />;
  const items = Array.isArray(data) ? data : [];
  if (!items.length) return <div>No brands found</div>;
  return (
    <ListWrap>
      {items.map((it) => (
        <CardBrand key={it.id} item={it} />
      ))}
    </ListWrap>
  );
};
export default ListBrand;
