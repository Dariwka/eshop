import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

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

const Card = ({ item }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const attrs = item?.attributes || {};
  const url1 = attrs?.img?.data?.attributes?.url || "";
  const url2 = attrs?.img2?.data?.attributes?.url || "";
  const title = attrs?.title || "";
  const slug = attrs?.slug;

  // === логика пользователя / профи ===
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch (e) {
    // игнор
  }
  // Пока считаем: если пользователь залогинен — он профи.  // Потом можно заменить на user?.isProfessional.
  //
  const isProUser = !!user;
  const proOnly = attrs.proOnly === true; // если заведёшь в Strapi
  //
  const price = attrs.price ?? null;
  const oldPrice = attrs.oldPrice ?? null;
  const proPrice = attrs.proPrice ?? null;
  let mainPrice = price;
  let crossedPrice = null;

  // обычная логика "старой цены", если нет proPrice
  //
  if (!isProUser || !proPrice) {
    if (oldPrice && price && Number(oldPrice) > Number(price)) {
      crossedPrice = oldPrice;
      mainPrice = price;
    } else {
      crossedPrice = null;
      mainPrice = price;
    }
  } // если профи и есть специальная цена
  //
  if (isProUser && proPrice) {
    // зачёркнутой показываем "обычную" цену (oldPrice или price)
    //
    crossedPrice = oldPrice || price || null;
    mainPrice = proPrice;
  }

  // Для карточки фикс. слот 275x400 -> генерим srcset под это соотношение
  const widths = [300, 450, 600]; // браузер выберет сам
  const ratio = 400 / 275; // чтобы не мылить изображение

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
        <Prices>
          {proOnly && !isProUser ? (
            <ProOnlyText>
              Vain ammattilaisille – kirjaudu nähdäksesi hinnan
            </ProOnlyText>
          ) : (
            <>
              {crossedPrice != null && (
                <OldPrice>€{Number(crossedPrice).toFixed(2)}</OldPrice>
              )}
              {mainPrice != null && (
                <NewPrice>€{Number(mainPrice).toFixed(2)}</NewPrice>
              )}
            </>
          )}
        </Prices>
      </CardProduct>
    </LinkProduct>
  );
};

export default Card;
