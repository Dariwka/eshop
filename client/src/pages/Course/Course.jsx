import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ModeIcon from "@mui/icons-material/Mode";
import TrainingBooking from "../../components/TrainingBooking/TrainingBooking";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const Container = styled.div`
  font-family: "Urbanist", sans-serif;
  padding: 20px 50px;
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
const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 14px;
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

const Course = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");

  const { data, loading } = useFetch(`/courses/${id}?populate=*`);

  const [show, setShow] = useState(false);

  const trainingHandler = () => {
    setShow(!show);
  };

  return (
    <Container>
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
            <TimeWrapper type="date">
              <CalendarMonthIcon />
              {data?.attributes?.date.split("-").reverse().join("/")}
            </TimeWrapper>
            <TimeWrapper type="time">
              <AccessTimeIcon />
              {data?.attributes?.time.split(":00.000")[0]}
            </TimeWrapper>

            <Desc>{data?.attributes?.desc}</Desc>
            <AddButton onClick={trainingHandler}>
              <ModeIcon /> BOOK
            </AddButton>
            <InfoContainer>
              <HrBorder />
              <span>Area: {data?.attributes?.area}</span>
              <Hr />
              <span>Goal: {data?.attributes?.goal}</span>
              <Hr />
              <span>Tags: {data?.attributes?.tags}</span>
            </InfoContainer>
          </Right>
        </>
      )}
      {show && (
        <TrainingBooking
          trainingTime={data?.attributes?.time.split(":00.000")[0]}
          trainingTitle={data?.attributes?.title}
          trainingDate={data?.attributes?.date}
          close={trainingHandler}
        />
      )}
    </Container>
  );
};

export default Course;
