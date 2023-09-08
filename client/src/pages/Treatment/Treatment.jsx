import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookingForm from "../../components/Booking/BookingForm";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ContainerTreatment = styled.div`
  padding: 30px 50px;
  display: flex;
  gap: 50px;
  ${mobile({ flexDirection: "column", padding: "20px" })}
`;
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  ${mobile({ gap: "10px" })};
`;

const ImagesContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
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

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 14px;
`;

const Desc = styled.p`
  font-size: 18px;
  font-weight: 300;
  text-align: justify;
  ${mobile({ fontSize: "16px" })};
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

const Hr = styled.hr`
  width: 200px;
  border: 1px solid rgb(238, 237, 237);
`;

const Treatment = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const { data, loading } = useFetch(`/treatments/${id}?populate=*`);

  //booking
  const [open, setOpen] = useState(false);

  const bookingOpenHandler = () => {
    setOpen(!open);
  };

  return (
    <ContainerTreatment>
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        <>
          <LeftContainer>
            <ImagesContainer>
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
            </ImagesContainer>
            <MainImg>
              <ImageBig
                src={data?.attributes[selectedImg]?.data?.attributes.url}
                alt=""
              />
            </MainImg>
          </LeftContainer>
          <Right>
            <Title>{data?.attributes?.title}</Title>
            <Price>€{data?.attributes?.price}</Price>
            <Time>
              <AccessTimeOutlinedIcon />
              {data?.attributes?.duration} min
            </Time>

            <Desc>{data?.attributes?.info}</Desc>
            <AddButton onClick={bookingOpenHandler}>
              <CalendarMonthIcon /> Booking a treatment
            </AddButton>

            <InfoContainer>
              <span>Area: {data?.attributes?.area}</span>
              <span>Goal: {data?.attributes?.goal}</span>
              <span>Tags: {data?.attributes?.tags}</span>
            </InfoContainer>
            <HrBorder />
            <InfoContainer>
              <span>DESCRIPTION:{data?.attributes?.longDesc}</span>
              <Hr />
              <span>
                ADDITIONAL INFORMATION: {data?.attributes?.additional}
              </span>
              <Hr />
              <span>
                CONTRAINDICATIONS: {data?.attributes?.contraindication}
              </span>
              <Hr />
              <span>FAQ</span>
            </InfoContainer>
          </Right>
        </>
      )}
      {open && (
        <BookingForm
          treatment={data?.attributes?.title}
          close={bookingOpenHandler}
        />
      )}
    </ContainerTreatment>
  );
};

export default Treatment;
