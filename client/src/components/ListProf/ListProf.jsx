import React from "react";
import CardProf from "../CardProf/CardProf";
import useFetch from "../../hooks/useFetch";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ListProfContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;

const ListProf = ({ subCatsProf, maxPrice, profSort }) => {
  const { data, loading } = useFetch(
    `/professionals?populate=*&${subCatsProf?.map(
      (item) => `&[filters][sub_prof_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${profSort}`
  );

  console.log("prof", data);

  return (
    <ListProfContainer>
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        data?.map((item) => <CardProf item={item} key={item.id} />)
      )}
    </ListProfContainer>
  );
};

export default ListProf;
