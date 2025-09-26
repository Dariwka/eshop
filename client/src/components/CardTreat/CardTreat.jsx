import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";
import {
  getActivePrice,
  isPromoActive,
  formatCountdownParts,
} from "../../utils/promo";

function clTransform(url, t) {
  if (!url) return url;
  const i = url.indexOf("/upload/");
  if (i === -1) return url; // не cloudinary — отдаём как есть
  //
  const head = url.slice(0, i + 8); // включая "/upload/"
  //
  const tail = url.slice(i + 8); // если уже есть параметры размера — не дублируем
  //
  if (/(\bw_|h_|c_|q_auto|f_auto)/.test(tail)) return url;
  return `${head}${t}/${tail}`;
}
function clUrl(url, { w, h, fit = "fill" } = {}) {
  const base = `f_auto,q_auto,w_${w}${h ? `,h_${h}` : ""},c_${fit}`;
  return clTransform(url, base);
}
function srcSet(url, widths, ratioH) {
  // ratioH — какая высота нужна при ширине w (для карточки 275x400 -> 400/275)
  //
  return widths
    .map((w) => {
      const h = Math.round(w * ratioH);
      return `${clUrl(url, { w, h, fit: "fill" })} ${w}w`;
    })
    .join(", ");
}

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
  margin: 6px 0 2px;
`;
const Prices = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 0px;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: var(--muted);
`;

const NewPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand);
`;

const DiscountTag = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: red;
  color: #fff;
  border: 1px solid red;
`;

const CountdownBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  padding: 0 10px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.55);
  @supports (background: color-mix(in srgb, #000 35%, transparent)) {
    background: color-mix(in srgb, #000 35%, transparent);
  }
  @keyframes pulse {
    0%,
    100% {
      opacity: 0.95;
    }
    50% {
      opacity: 0.75;
    }
  }
  animation: pulse 2s ease-in-out infinite;
`;

const Blinker = styled.span`
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  display: inline-block;
  width: 0.6ch;
  text-align: center;
  animation: blink 1s steps(1, end) infinite;
`;

const CardTreat = ({ item }) => {
  const attrs = item?.attributes || {};
  const slug = attrs.slug;
  const promo = isPromoActive(attrs);

  const priceNow = getActivePrice(attrs);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!promo || !attrs?.promoEndsAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [promo, attrs?.promoEndsAt]);

  const msLeft =
    promo && attrs?.promoEndsAt ? new Date(attrs.promoEndsAt) - now : null;
  const parts = formatCountdownParts(msLeft);

  const discountPct =
    promo && typeof attrs.price === "number" && attrs.price > 0
      ? Math.round(100 - (priceNow / attrs.price) * 100)
      : null;

  const url1 = attrs?.img?.data?.attributes?.url || "";
  const url2 = attrs?.img2?.data?.attributes?.url || "";
  const title = attrs?.title || "";

  // Для карточки фикс. слот 275x400 -> генерим srcset под это соотношение
  const widths = [300, 450, 600]; // браузер выберет сам
  const ratio = 400 / 275; // чтобы не мылить изображение
  return (
    <LinkProduct to={`/treatment/${encodeURIComponent(slug)}`}>
      <CardTreatWrapper>
        <ImageContainer>
          {attrs.isNew && <Stick className="new">New </Stick>}
          {attrs.isPopular && <Stick className="popular">Popular </Stick>}
          {attrs.isSpecialOffer && <Stick className="specOffer">TARJOUS</Stick>}
          {url1 && (
            <Image
              alt={title}
              className="mainImg"
              src={clUrl(url1, { w: 450, h: Math.round(450 * ratio) })}
              srcSet={srcSet(url1, widths, ratio)}
              sizes="(max-width: 768px) 50vw, 275px"
              loading="lazy"
              decoding="async"
            />
          )}
          {url2 && (
            <Image
              alt={title}
              className="secondImg"
              src={clUrl(url2, { w: 450, h: Math.round(450 * ratio) })}
              srcSet={srcSet(url2, widths, ratio)}
              sizes="(max-width: 768px) 50vw, 275px"
              loading="lazy"
              decoding="async"
            />
          )}

          {promo && parts && (
            <CountdownBar>
              {parts.d > 0 && <span>{parts.d}d&nbsp;</span>}
              <span>{String(parts.h).padStart(2, "0")}</span>
              <Blinker>:</Blinker>
              <span>{String(parts.m).padStart(2, "0")}</span>
              <Blinker>:</Blinker>
              <span>{String(parts.s).padStart(2, "0")}</span>
            </CountdownBar>
          )}
        </ImageContainer>
        <Title>{attrs?.title}</Title>
        <Prices>
          {promo ? (
            <>
              <OldPrice>€{Number(attrs?.price).toFixed(0)}</OldPrice>
              <NewPrice>€{Number(priceNow).toFixed(0)}</NewPrice>
              {discountPct !== null && (
                <DiscountTag>-{discountPct}%</DiscountTag>
              )}
            </>
          ) : (
            <NewPrice>€{Number(attrs.price).toFixed(0)}</NewPrice>
          )}
        </Prices>
      </CardTreatWrapper>
    </LinkProduct>
  );
};

export default CardTreat;
