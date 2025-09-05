import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { getActivePrice, isPromoActive } from "../../utils/promo";

const LinkProduct = styled(Link)`
  text-decoration: none;
  color: unset;
`;
const CardTreatWrapper = styled.div`
  width: 275px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
  padding: 4px;
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
  &.popular {
    background-color: blue;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 400;
`;
const Prices = styled.div`
  display: flex;
  gap: 8px;
  align-items: baseline;
`;
const OldPrice = styled.span`
  text-decoration: line-through;
  opacity: 0.6;
`;

const NewPrice = styled.span`
  font-weight: 600;
`;
const Badge = styled.span`
  background: #e74c3c;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
`;

const CardTreat = ({ item }) => {
  const attrs = item?.attributes || {};
  const slug = attrs.slug;
  const promo = isPromoActive(attrs);
  const priceNow = getActivePrice(attrs);

  return (
    <LinkProduct to={`/treatment/${encodeURIComponent(slug)}`}>
      <CardTreatWrapper>
        <ImageContainer>
          {item?.attributes.isNew && <Stick className="new">New </Stick>}
          {item?.attributes.isPopular && (
            <Stick className="popular">Popular </Stick>
          )}
          {item?.attributes.isSpecialOffer && (
            <Stick className="specOffer">Special Offer</Stick>
          )}

          <Image
            src={attrs?.img?.data?.attributes?.url}
            alt={attrs?.title || ""}
            className="mainImg"
          />
          <Image
            src={attrs?.img2?.data?.attributes?.url}
            alt={attrs?.title || ""}
            className="secondImg"
          />
        </ImageContainer>
        <Title>
          {attrs?.title} {promo && <Badge>Tarjous</Badge>}
        </Title>
        <Prices>
          {promo && <OldPrice>€{Number(attrs?.price).toFixed(0)}</OldPrice>}

          <NewPrice>€{Number(priceNow).toFixed(0)}</NewPrice>
        </Prices>
      </CardTreatWrapper>
    </LinkProduct>
  );
};

export default CardTreat;
