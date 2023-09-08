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
  flex: 1;
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
  ${mobile({ display: "none" })}
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
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#c7e286" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
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
  window.open("https://maps.google.com?q=" + 60.238074 + "," + 24.876132);
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
          Ahti Pro Oy "KosmeDiK" is beauty room, shop and training center,
          located in Helsinki, Kannelmäki.
          <br />
          Pleasant shopping in our Online Store!
        </Desc>
        <SocialContainer>
          <SocialIcon
            href="https://www.facebook.com/kosmedik.eu"
            color="3B5999"
          >
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="7232bd">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon
            href="https://wa.me/00358400979610"
            target="_blank"
            rel="noopener noreferrer"
            color="25d366"
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
          <ListItem to="https://www.posti.fi/en/private/parcels-and-tracking">
            Order Tracking
          </ListItem>
          <ListItem onClick={scrollToTop} to="/products/2">
            Body
          </ListItem>
          <ListItem onClick={scrollToTop} to="/terms">
            Terms
          </ListItem>
          <ListItem onClick={scrollToTop} to="/professionals">
            Professionals
          </ListItem>
          <ListItem onClick={scrollToTop} to="/brands">
            Brands
          </ListItem>
          <ListItem onClick={scrollToTop} to="/professionals/2">
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
            Klaneettittie 6as, 2floor, Helsinki
          </AddressOnMap>
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} />
          <PhoneCall href="tel:+358400979610">0400979610</PhoneCall>
        </ContactItem>
        <ContactItem>
          <MailOutlineOutlinedIcon style={{ marginRight: "10px" }} />
          <Email href="mailto:info@kalamestari.fi">info@kosmedik.fi</Email>
        </ContactItem>
        <ContactItem>
          <StoreIcon style={{ marginRight: "10px" }} />
          <Tunnus> Y-tunnus: 3281350-8</Tunnus>
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
