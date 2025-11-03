import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Wrap = styled.main`
  max-width: 1040px;
  margin: 24px auto 64px;
  padding: 0 16px;
  color: #111827;
  line-height: 1.65;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin: 24px 0 12px;
  ${mobile({ fontSize: "26px" })}
`;
const H2 = styled.h2`
  font-size: 22px;
  font-weight: 800;
  margin: 28px 0 10px;
`;
const H3 = styled.h3`
  font-size: 18px;
  font-weight: 800;
  margin: 18px 0 8px;
`;
const P = styled.p`
  margin: 8px 0 14px;
`;
const UL = styled.ul`
  margin: 8px 0 14px 18px;
  li {
    margin: 6px 0;
  }
`;
const Block = styled.section`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  margin: 14px 0;
`;

const Muted = styled.p`
  color: #6b7280;
  font-size: 14px;
`;

const Link = styled.a`
  color: #2563eb;
  text-decoration: underline;
`;

export default function Privacy() {
  return (
    <Wrap>
      <H1>Tietosuojaseloste (Privacy Policy)</H1>
      <Muted>Päivitetty: 20.10.2025</Muted>

      <Block>
        <H2>1. Rekisterinpitäjä</H2>
        <P>
          Ahti Pro Oy (verkkokaupan nimi <b>kosmeDiK</b>)<br />
          Y-tunnus: 3281350-8
          <br />
          Sähköposti:{" "}
          <Link href="mailto:info@kosmedik.eu">info@kosmedik.eu</Link>
          <br />
          Osoitteet: Klaneettitie 6A, 2. krs, Helsinki &nbsp;|&nbsp; Kehruutie
          4, Malminkartano, Helsinki
        </P>
      </Block>

      <Block>
        <H2>2. Mitä henkilötietoja käsittelemme</H2>
        <UL>
          <li>
            <b>Tilaustiedot (verkkokauppa):</b> nimi, yhteystiedot,
            toimitusosoite, tilatut tuotteet, maksutapahtumatiedot (viite, tila;
            ei tallenneta maksukortin numeroa), laskutustiedot.
          </li>
          <li>
            <b>Ajanvaraus- ja hoitotiedot:</b> nimi, puhelin, sähköposti,
            varattu palvelu, ajankohta, lisätiedot/kommentit.
          </li>
          <li>
            <b>Voucherit/lahjakortit:</b> ostajan ja saajan nimi ja sähköposti,
            koodi, arvo, voimassaoloaika, lunastukset.
          </li>
          <li>
            <b>Asiakaspalautteet ja yhteydenotot:</b> viestien sisältö ja
            metatiedot.
          </li>
          <li>
            <b>Eväste- ja analytiikkatiedot:</b> laitteen ja selaimen tekniset
            tiedot, sivulataukset, kampanjatunnisteet, suostumusvalinnat.
          </li>
          <li>
            <b>Uutiskirje:</b> sähköpostiosoite ja suostumuspäivä.
          </li>
        </UL>
      </Block>

      <Block>
        <H2>3. Käsittelyn tarkoitukset ja oikeusperuste</H2>
        <UL>
          <li>
            <b>Sopimuksen täytäntöönpano:</b> tilausten ja ajanvarausten
            käsittely, toimitus, asiakaspalvelu, vouchereiden toimittaminen
            (GDPR 6(1)(b)).
          </li>
          <li>
            <b>Lakisääteiset velvoitteet:</b> kirjanpito, verotus,
            kuluttajansuoja (GDPR 6(1)(c)).
          </li>
          <li>
            <b>Oikeutettu etu:</b> asiakassuhteen hoito, palvelun kehittäminen,
            väärinkäytösten estäminen (GDPR 6(1)(f)).
          </li>
          <li>
            <b>Suostumus:</b> evästeet/analyytiikka/markkinointi, uutiskirje
            (GDPR 6(1)(a)). Suostumuksen voi perua milloin tahansa.
          </li>
        </UL>
      </Block>

      <Block>
        <H2>4. Evästeet (cookies)</H2>
        <P>
          Käytämme välttämättömiä evästeitä sivuston toimimiseksi sekä
          suostumuksellasi analyytiikka- ja markkinointievästeitä. Voit hallita
          valintoja evästebannerissa tai selaimesi asetuksissa.
        </P>
        <H3>Tyypit</H3>
        <UL>
          <li>
            <b>Välttämättömät:</b> istunnon ylläpito, ostoskori, maksuprosessi
            (säilytys tyypillisesti 1 pv – 12 kk).
          </li>
          <li>
            <b>Analyytiikka:</b> sivuston käyttö, konversiot (säilytys
            tyypillisesti 1–24 kk).
          </li>
          <li>
            <b>Markkinointi:</b> kohdentaminen ja uudelleenmarkkinointi
            (säilytys tyypillisesti 1–12 kk).
          </li>
        </UL>
      </Block>

      <Block>
        <H2>5. Tietojen vastaanottajat ja siirrot</H2>
        <UL>
          <li>
            <b>Maksunvälittäjä:</b> esim. pankki-/korttimaksut, verkkomaksut
            (saavat maksutapahtumaan tarvittavat tiedot).
          </li>
          <li>
            <b>Toimitus- ja postituspalvelut</b> (toimitusosoite ja
            yhteystiedot).
          </li>
          <li>
            <b>Uutiskirjepalvelu</b> (vain suostumuksella annettu sähköposti).
          </li>
          <li>
            <b>Verkkopalvelun ylläpito ja analytiikka</b> (tekniset
            palveluntarjoajat).
          </li>
        </UL>
        <P>
          Tietoja voidaan siirtää EU/ETA-alueen ulkopuolelle, jos
          palveluntarjoaja sijaitsee siellä. Tällöin siirto perustuu EU:n
          komission mallisopimuslausekkeisiin tai muuhun GDPR:n mukaiseen
          suojauskeinoon.
        </P>
      </Block>

      <Block>
        <H2>6. Säilytysajat</H2>
        <UL>
          <li>
            <b>Tilaus- ja maksutiedot:</b> kirjanpitoaineisto yleensä 6 vuotta
            tilikauden päättymisestä.
          </li>
          <li>
            <b>Ajanvaraus- ja hoitotiedot:</b> 2 vuotta viimeisestä asioinnista,
            ellei laki edellytä pidempää.
          </li>
          <li>
            <b>Voucherit:</b> voimassaoloaika + 2 vuotta (lunastushistoria ja
            petosten ehkäisy).
          </li>
          <li>
            <b>Yhteydenotot:</b> enintään 12 kuukautta.
          </li>
          <li>
            <b>Evästeet:</b> tyypistä riippuen 1 päivä – 24 kuukautta (ks.
            evästekuvaus).
          </li>
        </UL>
      </Block>

      <Block>
        <H2>7. Asiakkaan oikeudet</H2>
        <UL>
          <li>
            Oikeus <b>saada pääsy</b> tietoihin ja <b>saada kopio</b> tiedoista.
          </li>
          <li>
            Oikeus tietojen <b>oikaisuun</b> tai <b>poistoon</b> sekä käsittelyn{" "}
            <b>rajoittamiseen</b>.
          </li>
          <li>
            Oikeus <b>vastustaa</b> käsittelyä, kun perusteena on oikeutettu
            etu.
          </li>
          <li>
            Oikeus <b>peruuttaa suostumus</b> milloin tahansa (ei vaikuta ennen
            peruutusta tehtyyn käsittelyyn).
          </li>
          <li>
            Oikeus <b>siirtää tiedot</b> järjestelmästä toiseen koneellisesti
            luettavassa muodossa.
          </li>
          <li>
            Oikeus tehdä valitus <b>Tietosuojavaltuutetun toimistolle</b>:{" "}
            <Link href="https://tietosuoja.fi" target="_blank" rel="noopener">
              tietosuoja.fi
            </Link>
            .
          </li>
        </UL>
        <P>
          Voit käyttää oikeuksiasi ottamalla meihin yhteyttä:{" "}
          <Link href="mailto:info@kosmedik.eu">info@kosmedik.eu</Link>.
        </P>
      </Block>

      <Block>
        <H2>8. Turvallisuus</H2>
        <P>
          Käytämme asianmukaisia teknisiä ja organisatorisia suojatoimia
          (salatut yhteydet, pääsynhallinta, varmuuskopiot). Tietoja
          käsittelevillä kumppaneilla on sopimusperusteinen
          salassapitovelvollisuus.
        </P>
      </Block>

      <Block>
        <H2>9. Alaikäiset</H2>
        <P>
          Palvelut on suunnattu pääsääntöisesti täysi-ikäisille. Alaikäisen
          osalta edellytämme huoltajan suostumusta ostamiseen ja
          hoitopalveluihin paikallisen lainsäädännön mukaisesti.
        </P>
      </Block>

      <Block>
        <H2>10. Muutokset selosteeseen</H2>
        <P>
          Voimme päivittää tätä selostetta palvelun tai lainsäädännön
          muuttuessa. Uusin versio on aina tällä sivulla, ja merkittävistä
          muutoksista ilmoitamme erikseen (esim. sivustolla tai sähköpostitse).
        </P>
      </Block>
    </Wrap>
  );
}
