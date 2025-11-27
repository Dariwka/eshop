import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import { isProUser } from "../../utils/auth";

/* ===== helpers: Cloudinary трансформация + srcset (безопасные) ===== */
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

const CardProduct = styled.div`
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
  padding: 3px 6px;
  z-index: 3;
  font-weight: 500;
  font-size: 14px;
  border-radius: 3px;

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
  gap: 14px;
  margin-top: 2px;
  align-items: baseline;
  min-height: 22px;
`;

const OldPrice = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: gray;
  text-decoration: line-through;
`;

const NewPrice = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const ProOnlyText = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const ContactText = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const Card = ({ item }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const attrs = item?.attributes || {};
  const url1 = attrs?.img?.data?.attributes?.url || "";
  const url2 = attrs?.img2?.data?.attributes?.url || "";
  const title = attrs?.title || "";
  const slug = attrs?.slug || "";

  const isProProduct = attrs.isPro === true;
  const userIsPro = isProUser();

  const normalizeNumber = (val) => {
    if (val === undefined || val === null) return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const cleaned = val.replace(",", ".").trim();
      const num = Number(cleaned);
      return Number.isNaN(num) ? null : num;
    }
    return null;
  };

  const price = normalizeNumber(attrs.price);
  const proPrice = normalizeNumber(attrs.proPrice);
  const oldPrice = normalizeNumber(attrs.oldPrice);

  const hasPrice = price !== null && !Number.isNaN(price);
  const hasProPrice = proPrice !== null && !Number.isNaN(proPrice);
  const hasOldPrice = oldPrice !== null && !Number.isNaN(oldPrice);
  const isZeroPrice = hasPrice && price === 0;
  const contactText = attrs.contactPrice || "Ota yhteyttä hinnasta";

  // === ЛОГИКА ЦЕН ДЛЯ КАРТОЧКИ ===
  //
  let priceContent = null;

  // 1) Pro-товар, гость -> только текст "только для профи"
  //
  if (isProProduct && !userIsPro && hasProPrice) {
    priceContent = (
      <ProOnlyText>
        Vain ammattilaisille – kirjaudu nähdäksesi hinnan
      </ProOnlyText>
    );
  }
  // 2) Проф-юзер, есть спец. цена — показываем её, даже если price = 0
  //
  else if (userIsPro && hasProPrice) {
    const crossed =
      (hasPrice && price > 0 && price) ||
      (hasOldPrice && oldPrice > 0 && oldPrice) ||
      null;
    priceContent = (
      <>
        {crossed !== null && <OldPrice>€{crossed.toFixed(2)}</OldPrice>}
        <NewPrice>€{proPrice.toFixed(2)}</NewPrice>
      </>
    );
  }
  // 3) Цена = 0 и proPrice нет → контакт
  //
  else if (isZeroPrice && !hasProPrice) {
    priceContent = <ContactText>{contactText}</ContactText>;
  }

  // 4) Обычная скидка
  //
  else if (hasOldPrice && hasPrice && oldPrice > price) {
    priceContent = (
      <>
        <OldPrice>€{oldPrice.toFixed(2)}</OldPrice> 
        <NewPrice>€{price.toFixed(2)}</NewPrice> 
      </>
    );
  }
  // 5) Обычная цена
  //
  else if (hasPrice && price > 0) {
    priceContent = <NewPrice>€{price.toFixed(2)}</NewPrice>;
  }

  // 6) Фолбек — просто текст «Ota yhteyttä hinnasta»
  //
  else if (contactText) {
    priceContent = <ContactText>{contactText}</ContactText>;
  }

  // Для карточки фикс. слот 275x400 -> генерим srcset под это соотношение
  //
  const widths = [300, 450, 600];
  const ratio = 400 / 275;

  return (
    <LinkProduct
      onClick={scrollToTop}
      className="link"
      to={`/product/${encodeURIComponent(slug)}`}
    >
      <CardProduct>
        <ImageContainer>
          {attrs.isNew && <Stick className="new">New</Stick>}
          {attrs.isSale && <Stick className="specOffer">Sale</Stick>}
          {attrs.isPopular && <Stick className="popular">Popular</Stick>}

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
        </ImageContainer>
        <Title>{attrs.title}</Title>
        <Prices>{priceContent}</Prices>
      </CardProduct>
    </LinkProduct>
  );
};

export default Card;
