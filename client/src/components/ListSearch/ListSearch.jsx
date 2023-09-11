import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";

const LinkProduct = styled(Link)`
  text-decoration: none;
  color: unset;
`;

const CardProduct = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
  ${mobile({ width: "auto", marginBottom: "25px" })};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;

  &:hover {
    .secondImg {
      z-index: 2;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  background-color: white;
  &.mainImg {
    z-index: 1;
  }
  &.secondImg {
  }
`;

const Stick = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  padding: 3px;
  z-index: 3;
  font-weight: 500;
  font-size: 14px;
  &.new {
    background-color: green;
  }

  &.specOffer {
    background-color: red;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 400;
`;

const Prices = styled.div`
  display: flex;
  gap: 20px;
`;

const OldPrice = styled.h3`
  font-size: 18px;
  font-weight: 500;

  &:first-child {
    color: gray;
    text-decoration: line-through;
  }
`;

const NewPrice = styled.h3`
  font-size: 18px;
  font-weight: 500;

  &:first-child {
    color: gray;
    text-decoration: line-through;
  }
`;

const ListSearch = ({ product }) => {
  console.log("", product);

  return (
    <>
      <div className="list">
        <LinkProduct>
          <CardProduct>
            <ImageContainer>
              {product?.isNew && <Stick className="new">New Season</Stick>}
              {product?.isSale && (
                <Stick className="specOffer">Special Offer</Stick>
              )}
              <Image
                src={product?.img?.data?.attributes?.url}
                alt=""
                className="mainImg"
              />
              <Image
                src={product?.img2?.data?.attributes?.url}
                alt=""
                className="secondImg"
              />
            </ImageContainer>
            <Title>{product.title}</Title>
            <Prices>
              <OldPrice>€{product.oldPrice || product?.price + 20}</OldPrice>
              <NewPrice>€{product?.price}</NewPrice>
            </Prices>
          </CardProduct>
        </LinkProduct>
      </div>
    </>
  );
};

export default ListSearch;