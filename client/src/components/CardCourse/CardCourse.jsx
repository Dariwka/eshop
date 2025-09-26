import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";

/* Cloudinary helpers */
function clTransform(url, t) {
  if (!url) return url;
  const i = url.indexOf("/upload/");
  if (i === -1) return url;
  const head = url.slice(0, i + 8);
  const tail = url.slice(i + 8);
  if (tail.startsWith("f_auto") || tail.startsWith("q_auto")) return url;
  return `${head}${t}/${tail}`;
}
function clUrl(url, { w = 600, h = 400 } = {}) {
  const base = `f_auto,q_auto:eco,dpr_auto,c_fill,g_auto,w_${w},h_${h}`;
  return clTransform(url, base);
}
function srcSet(url, widths, h = 400) {
  return widths.map((w) => `${clUrl(url, { w, h })} ${w}w`).join(", ");
}
/* styles */

const LinkCourse = styled(Link)`
  text-decoration: none;
  color: unset;
`;
const StyledCard = styled.div`
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
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  background: #fff;
  &.mainImg {
    z-index: 1;
  }
`;
const Stick = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  color: #fff;
  padding: 3px;
  z-index: 3;
  font-weight: 600;
  font-size: 14px;
  border-radius: 4px;
  &.new {
    background: green;
  }
  &.popular {
    background: red;
  }
`;
const Title = styled.h2`
  font-size: 16px;
  font-weight: 400;
`;
const Prices = styled.div`
  display: flex;
  gap: 20px;
  align-items: baseline;
`;
const OldPrice = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: gray;
  text-decoration: line-through;
`;
const NewPrice = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;
const CardCourse = ({ item }) => {
  const a = item?.attributes || {};
  const slug = a.slug; // <== ссылка по slug
  //
  const u1 = a?.img?.data?.attributes?.url || "";
  const u2 = a?.img2?.data?.attributes?.url || "";
  const widths = [300, 400, 550, 700]; // под слот 275x400
  return (
    <LinkCourse to={`/training/${encodeURIComponent(slug)}`}>
      <StyledCard>
        <ImageContainer>
          {a.isNew && <Stick className="new">New</Stick>}
          {a.isPopular && <Stick className="popular">Popular</Stick>}
          {u1 && (
            <Img
              className="mainImg"
              alt=""
              src={clUrl(u1, { w: 600, h: 400 })}
              srcSet={srcSet(u1, widths, 400)}
              sizes="(max-width: 768px) 90vw, 275px"
              loading="lazy"
              decoding="async"
            />
          )}
          {u2 && (
            <Img
              className="secondImg"
              alt=""
              src={clUrl(u2, { w: 600, h: 400 })}
              srcSet={srcSet(u2, widths, 400)}
              sizes="(max-width: 768px) 90vw, 275px"
              loading="lazy"
              decoding="async"
            />
          )}
        </ImageContainer>
        <Title>{a.title}</Title>
        <Prices>
          {a.price != null && (
            <OldPrice>€{Number(a.price + 20).toFixed(0)}</OldPrice>
          )}
          {a.price != null && (
            <NewPrice>€{Number(a.price).toFixed(0)}</NewPrice>
          )}
        </Prices>
      </StyledCard>
    </LinkCourse>
  );
};
export default CardCourse;
