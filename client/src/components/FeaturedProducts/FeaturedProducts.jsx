import React from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card/Card";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const FeaturedProd = styled.div`
  margin: 100px 200px;
  ${mobile({ margin: "20px" })};
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  ${mobile({ flexDirection: "column" })};
`;

const Title = styled.h1`
  flex: 2;
  text-transform: capitalize;
  ${mobile({ fontSize: "x-large" })};
`;

const Desc = styled.p`
  flex: 3;
  color: gray;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  ${mobile({ flexDirection: "column", gap: "15px" })};
`;

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  return (
    <FeaturedProd>
      <Top>
        <Title>{type} products</Title>
        <Desc>
          From now untill further we give for all our clients discount. Shop
          with us and get great deals.
        </Desc>
      </Top>
      <Bottom>
        {error ? (
          "Something went wrong"
        ) : loading ? (
          <LoadingButton loading={loading} />
        ) : (
          data?.map((item) => <Card item={item} key={item.id} />)
        )}
      </Bottom>
    </FeaturedProd>
  );
};

export default FeaturedProducts;
