import React from "react";
import CardTreat from "../../components/CardTreat/CardTreat";
import useFetch from "../../hooks/useFetch";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ListTreatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;

const ListTreat = ({ subCatsTreat, maxPrice, treatSort }) => {
  const { data, loading } = useFetch(
    `/treatments?populate=*&${subCatsTreat?.map(
      (item) => `&[filters][sub_treat_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${treatSort}`
  );

  return (
    <ListTreatContainer>
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        data?.map((item) => <CardTreat item={item} key={item.id} />)
      )}
    </ListTreatContainer>
  );
};

export default ListTreat;
