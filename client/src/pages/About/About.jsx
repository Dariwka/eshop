import React from "react";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ContainerAbout = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgb(255, 255, 255, 0.5), rgb(255, 255, 255, 0.5)),
    url("https://res.cloudinary.com/lvimeridijan/image/upload/v1692861574/kosmedik/kosmedik_2_es9pgs.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "100%", paddingTop: "20px", paddingBottom: "20px" })}
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 45%;
  background-color: white;
  ${mobile({ width: "80% ", padding: "10px" })}
`;
const TextContainer = styled.div``;
const Title = styled.h1`
  font-size: 26px;
  font-weight: 400;
  text-align: center;
  padding: 5px;
  letter-spacing: 1px;
  ${mobile({ fontSize: "22px" })}
`;
const Text = styled.h2`
  font-size: 22px;
  font-weight: 400;
  text-align: center;
  padding: 5px;
  ${mobile({ fontSize: "18px" })}
`;

const Desc = styled.p`
  padding-top: 15px;
  letter-spacing: 1px;
`;

const Row = styled.ul`
  padding-top: 10px;
`;

const List = styled.li``;

const About = () => {
  return (
    <ContainerAbout>
      <Wrapper>
        <TextContainer>
          <Title>Welcome our Dear Guest!</Title>
          <Text>
            Firstly we would like to wish you a pleasant shopping in our Online
            Store! <LoyaltyIcon />
          </Text>
          <Desc>
            KosmeDiK tmi is beauty room, located in Helsinki, Kannelmäki. <br />
            Our address - Klaneettitie 6A 2 floor, Helsinki. <br /> Near of us
            you can find 2 hours free parking.
          </Desc>
          <Desc>
            We offer a wide range of services in professional and machine
            cosmetology as well as aesthetic medicine.
          </Desc>
          <Row>
            <List>Cavitation treatment</List>
            <List>Radio Frequency</List>
            <List>Vacuum</List>
            <List>Microneedling treatment</List>
            <List>Pressotherapy with infrared sauna</List>
            <List>CryoLipolysis</List>
            <List>Electroporation</List>
            <List>Ultrasound</List>
            <List>Diamond dermabrasion</List>
            <List>Darsenval</List>
            <List>Face cleansing</List>
            <List>Problematic skin care</List>
            <List>Chemical peels</List>
          </Row>
          <Desc>
            More than 10 years we are distributor of Dermedics brand. <br />
            DERMEDICS™ offers medical gels, professional dermocosmetics and
            digital devices for aesthetic medicine treatments which are produced
            in accordance with European Union directives and standards.
          </Desc>
        </TextContainer>
      </Wrapper>
    </ContainerAbout>
  );
};

export default About;
