import React from "react";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import styled from "styled-components";

const breakpoints = { md: "768px", lg: "1200px" };

const ContainerAbout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("https://res.cloudinary.com/lvimeridijan/image/upload/v1692826157/kosmedik/kosmedik_2_es9pgs.jpg")
      center / cover no-repeat;
  @media (min-width: ${breakpoints.lg}) {
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
      ),
      url("https://res.cloudinary.com/lvimeridijan/image/upload/v1692826157/kosmedik/kosmedik_2_es9pgs.jpg")
        center / cover no-repeat;
  }
`;
const Wrapper = styled.div`
  width: clamp(280px, 92vw, 980px);
  margin: 40px auto;
  padding: clamp(16px, 3vw, 40px);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.md}) {
    margin: 60px auto;
  }
`;
const TextContainer = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;
const Title = styled.h1`
  margin: 0 0 8px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.3px;
  font-size: clamp(24px, 2.4vw + 14px, 40px);
  line-height: 1.2;
`;
const Subtitle = styled.h2`
  margin: 0 0 16px;
  text-align: center;
  font-weight: 500;
  color: #2d2d2d;
  font-size: clamp(18px, 1.2vw + 14px, 24px);
  line-height: 1.35;
  svg {
    vertical-align: middle;
    transform: translateY(-2px);
  }
`;
const Desc = styled.p`
  margin: 12px 0 0;
  font-size: clamp(15px, 0.7vw + 12px, 18px);
  line-height: 1.7;
  color: #404040;
`;
const Row = styled.ul`
  margin: 18px 0 0;
  padding-left: 1.2em;
  display: grid;
  gap: 8px;
  list-style: disc;
  font-size: clamp(15px, 0.7vw + 12px, 18px);
  line-height: 1.6;
  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;
const List = styled.li`
  padding-left: 2px;
`;
const About = () => {
  return (
    <ContainerAbout>
      <Wrapper>
        <TextContainer>
          <Title>Tervetuloa!</Title>
          <Subtitle>
            Toivotamme sinulle miellyttävää ostoskokemusta verkkokaupassamme
            <LoyaltyIcon />
          </Subtitle>
          <Desc>
            KosmeDiK on kauneushoitola Helsingissä, Kannelmäessä.
            <br /> Osoite: Klaneettitie 6A, 2. krs, Helsinki. <br /> Läheltä
            löytyy 2 tunnin maksuton pysäköinti.
          </Desc>
          <Desc>
            Meillä on myös toinen toimipiste Malminkartanossa, vain 5 minuutin
            kävelymatkan päässä junasemalta. Sisäänkäynti suoraan kadulta.
            <br /> Osoite: Kehruutie 4, Helsinki. <br /> Alueella on 2–4 tunnin
            maksuton pysäköinti.
          </Desc>
          <Desc>
            Tarjoamme laajan valikoiman ammattimaisia palveluja esteettisessä
            kosmetologiassa ja laitehoidoissa sekä esteettisessä lääketieteessä.
          </Desc>
          <Row>
            <List>Kavitaatiohoito</List> <List>Radiofrekvenssihoito</List>
            <List>Vakuumi-/imuhoito</List> <List>Mikroneulaus</List>
            <List>Lymfapress-hoito infrapunalämmöllä</List>
            <List>Kryolipolyysi</List> <List>Elektroporaatio</List>
            <List>Ultraäänihoito</List>
            <List>Timanttihionta (mikrodermabraasio)</List>
            <List>Darsonval-hoito</List> <List>Kasvojen puhdistus</List>
            <List>Ongelmaihon hoito</List> <List>Kemialliset kuorinnat</List>
          </Row>
          <Desc>
            Olemme olleet jo yli 10 vuotta DERMEDICS-brändin jakelija. DERMEDICS
            tarjoaa lääkinnällisiä geelejä, ammattilaisille suunnattuja
            kosmeettisia valmisteita sekä digitaalisia laitteita esteettiseen
            lääketieteeseen. Tuotteet valmistetaan EU-direktiivien ja
            -standardien mukaisesti.
          </Desc>
        </TextContainer>
      </Wrapper>
    </ContainerAbout>
  );
};
export default About;
