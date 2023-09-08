import React, { useState, useRef, useEffect } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { sliderPhotos } from "../../data";
import styled from "styled-components";

const SliderContainer = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const Container = styled.div`
  width: 1400vw;
  height: 100%;
  display: flex;
`;

const Image = styled.img`
  width: 100vw;
  height: 100%;
  object-fit: cover;
`;

const Icons = styled.div`
  bottom: 50px;
  display: flex;
  position: absolute;
  width: fit-content;
  left: 0;
  right: 0;
  margin: auto;
  gap: 10px;
`;
const Icon = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: rgba(255, 247, 247, 0.733);
`;

const Slider = () => {
  const [currentSlide, setCurretSlide] = useState(0);
  const length = sliderPhotos.length;

  const timeout = useRef(null);

  const prevSlide = () => {
    if (timeout.currentSlide) {
      clearTimeout(timeout.currentSlide);
    }
    setCurretSlide(currentSlide === 0 ? length : currentSlide - 1);
  };
  const nextSlide = () => {
    if (timeout.currentSlide) {
      clearTimeout(timeout.currentSlide);
    }
    setCurretSlide(currentSlide === length ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    const nextSlide = () => {
      setCurretSlide((currentSlide) =>
        currentSlide === length - 1 ? 0 : currentSlide + 1
      );
    };
    timeout.currentSlide = setTimeout(nextSlide, 1800);

    return function () {
      if (timeout.currentSlide) {
        clearTimeout(timeout.currentSlide);
      }
    };
  }, [currentSlide, length]);

  if (!Array.isArray(sliderPhotos) || sliderPhotos.length <= 0) {
    return null;
  }

  return (
    <SliderContainer>
      <Container style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {sliderPhotos?.map((item) => (
          <Image key={item.id} src={item.img} />
        ))}
      </Container>
      <Icons>
        <Icon onClick={prevSlide}>
          <ArrowBackIosNewOutlinedIcon />
        </Icon>
        <Icon onClick={nextSlide}>
          <ArrowForwardIosOutlinedIcon />
        </Icon>
      </Icons>
    </SliderContainer>
  );
};

export default Slider;
