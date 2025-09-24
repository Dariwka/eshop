import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RoomIcon from "@mui/icons-material/Room";
import StoreIcon from "@mui/icons-material/Store";
import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  font-family: "Urbanist", sans-serif;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1`
  font-family: "Orbitron", sans-serif;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    display: "none",
  })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled(Link)`
  width: 50%;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
    color: green;
  }
`;
const ListItemOrder = styled.a`
  width: 50%;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
    color: green;
  }
`;
const Email = styled.a`
  text-decoration: none;
  color: black;
`;
const PhoneCall = styled.a`
  text-decoration: none;
  color: black;
`;
const AddressOnMap = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
const Tunnus = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
const Right = styled.div`
  flex: 0.5;
  padding: 20px;
  ${mobile({
    backgroundColor: "#c7e286",
  })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 70%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const showInMapClicked = () => {
  window.open("https://maps.google.com?q=60.238074,24.876132", "_blank");
};
const showMalminkartanoMapClicked = () => {
  window.open("https://maps.google.com?q=60.257056,24.851493", "_blank");
};
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Container>
      <Left>
        <StyledLink to="/">
          <Logo>kosmeDiK</Logo>
        </StyledLink>
        <Desc>
          Ahti Pro Oy "KosmeDiK" on kauneushoitola, myymälä ja koulutuskeskus,
          sijaitsee Helsingissä, Kannelmäessä ja Malminkartanossa. <br />
          Mukavaa ostoshetkeä verkkokaupassamme!
        </Desc>
        <SocialContainer>
          <SocialIcon
            href="https://www.facebook.com/kosmedik.eu"
            color="3B5999"
          >
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon
            href="https://www.instagram.com/kosmedik.eu/"
            target="_blank"
            rel="noopener noreferrer"
            color="833AB4"
          >
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon
            href="https://wa.me/00358400979610"
            target="_blank"
            rel="noopener noreferrer"
            color="25D366"
          >
            <WhatsAppIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem onClick={scrollToTop} to="/products/1">
            Face
          </ListItem>
          <ListItemOrder
            href="https://www.posti.fi/en/private/parcels-and-tracking"
            target="_blank"
          >
            Order Tracking
          </ListItemOrder>
          <ListItem onClick={scrollToTop} to="/products/2">
            Body
          </ListItem>
          <ListItem onClick={scrollToTop} to="/terms">
            Terms
          </ListItem>
          <ListItem onClick={scrollToTop} to="/products/3">
            Professionals
          </ListItem>
          <ListItem onClick={scrollToTop} to="/brands">
            Brands
          </ListItem>
          <ListItem onClick={scrollToTop} to="/devices">
            Devices
          </ListItem>
          <ListItem onClick={scrollToTop} to="/contact">
            Be our Partner
          </ListItem>
          <ListItem onClick={scrollToTop} to="/treatments">
            Treatments
          </ListItem>
          <ListItem onClick={scrollToTop} to="/trainings">
            Trainings
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} />
          <AddressOnMap onClick={showInMapClicked}>
            Klaneettitie 6A, 2. krs, Helsinki
          </AddressOnMap>
        </ContactItem>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} />
          <AddressOnMap onClick={showMalminkartanoMapClicked}>
            Kehruutie 4, Malminkartano, Helsinki
          </AddressOnMap>
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} />
          <PhoneCall href="tel:+358400979610">0400979610</PhoneCall>
        </ContactItem>
        <ContactItem>
          <MailOutlineOutlinedIcon style={{ marginRight: "10px" }} />
          <Email href="mailto:info@kosmedik.eu">info@kosmedik.eu</Email>
        </ContactItem>
        <ContactItem>
          <StoreIcon style={{ marginRight: "10px" }} />
          <Tunnus>Y-tunnus: 3281350-8</Tunnus>
        </ContactItem>
        <Payment src="/img/payment.png" alt="payment methods" />
      </Right>
    </Container>
  );
};
export default Footer;
