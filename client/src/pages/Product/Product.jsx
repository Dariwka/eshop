import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useFetch from "../../hooks/useFetch";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { ToastContainer, toast } from "react-toastify";

/* ===== Cloudinary helpers (как в других файлах) ===== */

function clTransform(url, t) {
  if (!url) return url;
  const i = url.indexOf("/upload/");
  if (i === -1) return url;
  const head = url.slice(0, i + 8);
  const tail = url.slice(i + 8);
  if (/(\bw_|h_|c_|q_auto|f_auto)/.test(tail)) return url;
  return `${head}${t}/${tail}`;
}
function clUrl(url, { w, h, fit = "fill" } = {}) {
  const base = `f_auto,q_auto,w_${w}${h ? `,h_${h}` : ""},c_${fit}`;
  return clTransform(url, base);
}
function srcSet(url, widths, ratioH) {
  return widths
    .map((w) => {
      const h = Math.round(w * ratioH);
      return `${clUrl(url, { w, h, fit: "fill" })} ${w}w`;
    })
    .join(", ");
}

const ProductContainer = styled.div`
  font-family: "Urbanist", sans-serif;
  padding: 30px 50px;
  display: flex;
  gap: 50px;
  ${mobile({ flexDirection: "column", gap: "30px", padding: "15px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  ${mobile({
    gap: "10px",
  })};
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 10px;
`;
const MainImg = styled.div`
  flex: 5;
  ${mobile({ flex: "3" })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${mobile({ gap: "20px" })};
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: bold;
`;
const Price = styled.span`
  font-size: 30px;
  color: green;
  font-weight: 500;
`;
const Desc = styled.p`
  font-size: 18px;
  font-weight: 300;
  text-align: justify;
  ${mobile({ fontSize: "16px" })};
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${mobile({ justifyContent: "center" })};
`;
const MinusButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
`;
const PlusButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
`;
const AddButton = styled.button`
  width: 250px;
  padding: 10px;
  background-color: green;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  ${mobile({ width: "auto" })};
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: gray;
  font-size: 14px;
  margin-top: 30px;
`;
const HrBorder = styled.hr`
  border: 1px solid rgb(238, 237, 237);
`;
const BrandRow = styled.div`
  margin: 8px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;

  .label {
    font-weight: 600;
    color: #333;
  }

  .brand-link {
    color: #0a7c5f;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .brand-link:hover {
    color: #0ccf9c;
    text-decoration: underline;
  }

  .brand-text {
    font-weight: 600;
    color: #555;
  }
`;

/* ============ компонент ============ */
const Product = () => {
  const { slug } = useParams(); // всегда работаем только со slug
  //
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1); // какие поля нам нужны
  //
  const fields =
    `fields[0]=title&fields[1]=desc&fields[2]=price&fields[3]=oldPrice` +
    `&fields[4]=stock&fields[5]=contactPrice&fields[6]=weight` +
    `&fields[7]=volume&fields[8]=area&fields[9]=goal&fields[10]=tags`;
  const populate =
    `populate[img][fields][0]=url` +
    `&populate[img2][fields][0]=url` +
    `&populate[brands][fields][0]=title` +
    `&populate[brands][fields][1]=slug`;

  const url = `/products?filters[slug][$eq]=${encodeURIComponent(
    slug || ""
  )}&${fields}&${populate}&publicationState=live`;

  const { data, loading, error } = useFetch(url); // как в Treatment: если массив – берём первый, если объект – как есть
  //
  const product = useMemo(
    () => (Array.isArray(data) ? data[0] : data || null),
    [data]
  );

  const attrs = product?.attributes || {};

  const url1 = attrs?.img?.data?.attributes?.url || "";
  const url2 = attrs?.img2?.data?.attributes?.url || "";
  const title = attrs?.title || "";

  const leftWidths = [160, 220, 320, 420];
  const ratio = 400 / 275;

  const brandAttrs = attrs?.brands?.data?.[0]?.attributes || null;
  const brandTitle = brandAttrs?.title || "-";
  const brandSlug = brandAttrs?.slug || null;

  const addHandler = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        title: attrs.title,
        desc: attrs.desc,
        price: attrs.price,
        img: url1,
        quantity,
      })
    );
    toast.success("Product successfully added to your shopping cart", {
      position: toast.POSITION.TOP_CENTER,
    });
    window.scrollTo(0, 0);
  };
  if (error) return <ProductContainer>Something went wrong</ProductContainer>;
  if (loading)
    return (
      <ProductContainer>
        <LoadingButton loading />
      </ProductContainer>
    );
  if (!product) return <ProductContainer>Product not found</ProductContainer>;
  return (
    <ProductContainer>
      <Left>
        <ImgContainer>
          {url1 && (
            <Image
              src={clUrl(url1, { w: 320, h: Math.round(320 * ratio) })}
              srcSet={srcSet(url1, leftWidths, ratio)}
              sizes="(max-width: 768px) 24vw, 140px"
              alt={title}
              loading="lazy"
              decoding="async"
              onClick={() => setSelectedImg("img")}
            />
          )}
          {url2 && (
            <Image
              src={clUrl(url2, { w: 320, h: Math.round(320 * ratio) })}
              srcSet={srcSet(url2, leftWidths, ratio)}
              sizes="(max-width: 768px) 24vw, 140px"
              alt={title}
              loading="lazy"
              decoding="async"
              onClick={() => setSelectedImg("img2")}
            />
          )}
        </ImgContainer>
        <MainImg>
          <img
            src={selectedImg === "img2" && url2 ? url2 : url1}
            alt={title}
            fetchpriority="high"
            loading="eager"
            decoding="async"
            style={{
              width: "100%",
              maxHeight: 800,
              objectFit: "cover",
              display: "block",
            }}
          />
        </MainImg>
      </Left>
      <Right>
                <Title>{attrs?.title}</Title>       
        {attrs?.price != null && <Price>€{attrs.price}</Price>}       
        <span>{attrs?.volume || attrs?.size}</span>       
        <Desc>{attrs?.desc}</Desc>       
        <Quantity>
          <MinusButton
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
                        -         
          </MinusButton>
                    {quantity}         
          <PlusButton onClick={() => setQuantity((prev) => prev + 1)}>
                        +         
          </PlusButton>
        </Quantity>
        <AddButton onClick={addHandler}>
                    <AddShoppingCartIcon /> ADD TO CART       
        </AddButton>
        <InfoContainer>
                    <HrBorder />         
          <span>Availability: {attrs?.stock}</span>         
          <span>{attrs?.contactPrice}</span>         
          <BrandRow>
                        <span className="label">Brand:</span>           
            {brandSlug ? (
              <Link
                className="brand-link"
                to={`/brands/${encodeURIComponent(brandSlug)}`}
              >
                                {brandTitle}             
              </Link>
            ) : (
              <span className="brand-text">{brandTitle}</span>
            )}
          </BrandRow>
                    <span>Weight: {attrs?.weight}</span>         
          <span>Size: {attrs?.volume}</span>         
          <span>Area: {attrs?.area}</span>         
          <span>Goal: {attrs?.goal}</span>         
          <span>Tag: {attrs?.tags}</span>       
        </InfoContainer>
      </Right>
            <ToastContainer />   
    </ProductContainer>
  );
};
export default Product;
