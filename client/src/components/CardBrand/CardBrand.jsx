import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";

/* ===== styles ===== */
const LinkBrand = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  pointer-events: auto;
`;

const Card = styled.article`
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

const LogoWrap = styled.div`
  height: 120px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #fafafa;
  overflow: hidden;

  ${mobile({ height: "100px" })}
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

/* ===== component ===== */
const CardBrand = ({ item }) => {
  const a = item?.attributes || {};
  const title = a.title || "";
  const slug = a.slug;
  const logo = a?.img?.data?.attributes?.url || "";

  const navigate = useNavigate();

  const content = (
    <Card
      onClick={() => {
        if (slug) navigate(`/brands/${encodeURIComponent(slug)}`);
      }}
    >
      <LogoWrap>
        {logo ? (
          <Img src={logo} alt={title} loading="lazy" decoding="async" />
        ) : (
          <span style={{ fontSize: 12, opacity: 0.6 }}>no logo</span>
        )}
      </LogoWrap>
      <Title>{title}</Title>
    </Card>
  );

  // если slug есть — оборачиваем в ссылку, если нет — просто карточка
  return slug ? (
    <LinkBrand to={`/brands/${encodeURIComponent(slug)}`}>{content}</LinkBrand>
  ) : (
    content
  );
};

export default CardBrand;
