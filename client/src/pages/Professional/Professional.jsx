import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ProfContainer = styled.div`
  font-family: "Urbanist", sans-serif;
  padding: 50px 50px;
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

const Professional = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");

  const [quantity, setQuantity] = useState(1);

  const { data, loading } = useFetch(`/professionals/${id}?populate=*`);

  return (
    <ProfContainer>
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        <>
          <Left>
            <ImgContainer>
              <Image
                src={data?.attributes?.img?.data?.attributes.url}
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <Image
                src={data?.attributes?.img2?.data?.attributes.url}
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </ImgContainer>
            <MainImg>
              <ImageBig
                src={data?.attributes[selectedImg]?.data?.attributes.url}
                alt=""
              />
            </MainImg>
          </Left>
          <Right>
            <Title>{data?.attributes?.title}</Title>
            <Price>€{data?.attributes?.price}</Price>
            <Desc>{data?.attributes?.desc}</Desc>
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
            <AddButton className="add">
              <AddShoppingCartIcon /> ADD TO CART
            </AddButton>
            <InfoContainer>
              <HrBorder />
              <span>Availability: {data?.attributes?.stock}</span>
              <span>
                Brand: {data?.attributes?.brand?.data[0].attributes?.title}
              </span>
              <span>Area: {data?.attributes?.area}</span>
              <span>Goal: {data?.attributes?.goal}</span>
              <span>Tag: {data?.attributes?.tags}</span>
            </InfoContainer>
          </Right>
        </>
      )}
    </ProfContainer>
  );
};

export default Professional;
