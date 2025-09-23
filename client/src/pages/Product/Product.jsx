import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { ToastContainer, toast } from "react-toastify";

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
  ${mobile({ gap: "10px" })};
`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  //height: 150px;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 10px;
`;
const MainImg = styled.div`
  flex: 5;
  ${mobile({ flex: "3" })};
`;

const ImageBig = styled.img`
  width: 100%;
  max-height: 800px;
  object-fit: cover;
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

const Product = () => {
  const { slug } = useParams();
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  /*const navigate = useNavigate();*/

  const url =
    `/products` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&fields[0]=title&fields[1]=desc&fields[2]=price&fields[3]=oldPrice` +
    `&fields[4]=stock&fields[5]=contactPrice&fields[6]=weight` +
    `&fields[7]=volume&fields[8]=area&fields[9]=goal&fields[10]=tags` +
    `&populate[img][fields][0]=url` +
    `&populate[img2][fields][0]=url` +
    `&populate[brands][fields][0]=title`;

  /*const { data, loading } = useFetch(`/products/${id}?populate=*`);*/
  const { data, loading, error } = useFetch(url);

  /*const product = useMemo(() => (Array.isArray(data) ? data[0] : null), [data]);*/
  const product = data?.[0];
  const attrs = product?.attributes;

  /*useEffect(() => {
    if (loading) return;
    if (error || !product) {
      navigate("/products", { replace: true });
    }
  }, [loading, error, product, navigate]);

  if (loading) {
    return <LoadingButton loading={loading} />;
  }

  if (!product) return null;*/

  const addHandler = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        title: attrs.title,
        desc: attrs.desc,
        price: attrs.price,
        img: attrs.img?.data?.attributes?.url,
        quantity,
      })
    );
    toast.success("Product successfulle added to your shopping cart", {
      position: toast.POSITION.TOP_CENTER,
    });
    window.scrollTo(0, 0);
  };

  return (
    <ProductContainer>
      {error ? (
        <>Something went wrong</>
      ) : loading ? (
        <LoadingButton loading={loading} />
      ) : !product ? (
        <>Product not found</>
      ) : (
        <>
          <Left>
            <ImgContainer>
              <Image
                src={attrs?.img?.data?.attributes?.url}
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <Image
                src={attrs?.img2?.data?.attributes?.url}
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </ImgContainer>
            <MainImg>
              <ImageBig
                src={attrs?.[selectedImg]?.data?.attributes?.url}
                alt=""
              />
            </MainImg>
          </Left>
          <Right>
            <Title>{attrs?.title}</Title>
            <Price>€{attrs?.price}</Price>
            <span>{attrs?.volume || attrs?.size}</span>
            <Desc>{attrs?.desc}</Desc>
            <Quantity>
              <MinusButton
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
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
              <span>
                Brand: {attrs?.brands?.data?.[0]?.attributes?.title || "-"}
              </span>
              <span>Weight: {attrs?.weight}</span>
              <span>Size: {attrs?.volume}</span>
              <span>Area: {attrs?.area}</span>
              <span>Goal: {attrs?.goal}</span>
              <span>Tag: {attrs?.tags}</span>
            </InfoContainer>
          </Right>
        </>
      )}
      <ToastContainer />
    </ProductContainer>
  );
};

export default Product;
