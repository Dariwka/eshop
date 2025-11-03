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
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  margin: 14px 0;
`;
const Link = styled.a`
  color: #2563eb;
  text-decoration: underline;
`;
const Muted = styled.p`
  color: #6b7280;
  font-size: 14px;
`;

export default function Terms() {
  return (
    <Wrap>
      <H1>Toimitusehdot (Terms & Conditions)</H1>
      <Muted>Päivitetty: 20.10.2025</Muted>

      <Block>
        <H2>1. Verkkokaupan tiedot</H2>
        <P>
          Ahti Pro Oy (verkkokaupan nimi <b>kosmeDiK</b>)<br />
          Y-tunnus: 3281350-8
          <br />
          Sähköposti:
          <Link href="mailto:info@kosmedik.eu">info@kosmedik.eu</Link>
          <br />
          Verkkosivut:
          <Link href="https://www.kosmedik.eu" target="_blank" rel="noopener">
            www.kosmedik.eu
          </Link>
          <br />
          Toimipaikat: Klaneettitie 6A, 2. krs, Helsinki &nbsp;|&nbsp; Kehruutie
          4, Malminkartano, Helsinki
        </P>
        <P>
          Myymme tuotteita kuluttajille ja yrityksille EU-alueella. Alaikäisen
          osalta edellytämme huoltajan suostumusta.
        </P>
      </Block>

      <Block>
        <H2>2. Hinnat ja verot</H2>
        <P>
          Kaikki hinnat on esitetty euroissa ja sisältävät arvonlisäveron
          <b> 25,5&nbsp;% (ALV)</b>, ellei toisin mainita. Pidätämme oikeuden
          hintojen ja toimituskulujen muutoksiin. Ajantasainen hinta näkyy
          ostoskorissa ja tilausvahvistuksessa.
        </P>
      </Block>

      <Block>
        <H2>3. Toimitustavat ja -kulut</H2>
        <UL>
          <li>
            <b>Posti pakettiautomaatti:</b> kiinteä toimitusmaksu
            <b>10,90&nbsp;€</b>.
          </li>
          <li>
            <b>Ilmainen toimitus</b> kun ostoskorin tuotteet ≥ <b>100&nbsp;€</b>
            . Ei koske
            <b> suurikokoisia/ylisuuri-paketteja</b> (laitteet yms.), joille
            toimitus hinnoitellaan erikseen ennen lähetystä.
          </li>
          <li>
            Toimitamme pääsääntöisesti Suomeen. Arvioitu käsittelyaika 1–3
            arkipäivää, Postin kuljetusaika yleensä 1–5 arkipäivää.
          </li>
          <li>
            Jos paketti on selvästi vaurioitunut luovutuksessa, tee välittömästi
            reklamaatio kuljetusyhtiölle ja ilmoita meille.
          </li>
        </UL>
      </Block>

      <Block>
        <H2>4. Tilaaminen ja sopimus</H2>
        <P>
          Tilaus syntyy, kun hyväksyt ostoskorin sisällön kassalla ja maksat
          tilauksen. Saat sähköpostiisi tilausvahvistuksen. Tarkistathan
          vahvistuksen ja yhteystietosi.
        </P>
      </Block>

      <Block>
        <H2>5. Maksutavat ja maksunvälittäjä</H2>
        <P>
          Maksut tarjoaa valittu maksunvälittäjä (esim. Stripe). Maksukortin
          täydet tiedot eivät välity tai tallennu meille. Maksu veloitetaan
          tilauksen yhteydessä.
        </P>
      </Block>

      <Block>
        <H2>6. Vaihto- ja palautusoikeus (tuotteet)</H2>
        <UL>
          <li>
            Sinulla on kuluttajana <b>14 päivän</b> peruuttamisoikeus
            etämyynnissä (ei koske yritysostoja).
          </li>
          <li>
            <b>Hygienia- ja kosmetiikkatuotteet</b> voidaan palauttaa vain, jos
            pakkaus on avaamaton, sinetit ehjät ja tuote myyntikelpoinen.
          </li>
          <li>
            Palautuksesta on ilmoitettava etukäteen sähköpostilla. Hyväksytyissä
            palautuksissa hyvitämme tuotteen hinnan; toimitusmaksua ei hyvitetä,
            ellei kyse ole virheestä.
          </li>
          <li>
            Palautuslähetyksen riski on lähettäjällä; pakkaa tuotteet
            huolellisesti.
          </li>
        </UL>
      </Block>

      <Block>
        <H2>7. Virheet ja reklamaatiot</H2>
        <P>
          Jos tuote on virheellinen tai kuljetuksessa vahingoittunut, ilmoita
          meille kohtuullisessa ajassa (suositus 14 pv vastaanotosta). Korjaamme
          tilanteen lain edellyttämällä tavalla (korjaus, vaihto tai
          hinnanalennus).
        </P>
      </Block>

      <Block>
        <H2>8. Lahjakortit ja voucherit</H2>
        <UL>
          <li>
            Voucherin tarjoushinta ja edut koskevat <b>vain</b> voucheria
            ostettaessa ja maksettaessa verkossa täysimääräisesti.
          </li>
          <li>
            Voucher on henkilökohtainen, mutta sen voi <b>lahjoittaa</b>
            toiselle ennen käyttöä. Arvo ja kampanjaehdot näkyvät voucherissa.
          </li>
          <li>
            Voimassaoloaika: yleensä <b>30/60/90 päivää</b> ostopäivästä (kuten
            voucheriin on merkitty). <b>Voimassaolon päätyttyä arvo raukeaa</b>;
            varausta ei voi tehdä tai siirtää umpeutumisen jälkeen.
          </li>
          <li>
            Kampanjoissa ajanvaraus tulee tehdä voimassaoloaikana ja varattu
            aika käyttää viimeistään voimassaolon puitteissa.
          </li>
        </UL>
      </Block>

      <Block>
        <H2>9. Ajanvaraus, peruutukset ja saapumatta jättäminen</H2>
        <UL>
          <li>
            Varausta voi siirtää tai peruuttaa maksutta viimeistään
            <b> 24 h</b> ennen varattua aikaa.
          </li>
          <li>
            Peruutus <b>&lt; 24 h</b> ennen aikaa: veloitamme <b>50&nbsp;%</b>
            palvelun hinnasta (tai vastaavan osuuden voucherista).
          </li>
          <li>
            Peruutus <b>&lt; 12 h</b> / <b>no-show</b>: veloitamme
            <b>100&nbsp;%</b> hinnasta. Sääntöä sovelletaan myös äkillisen
            sairauden tms. syyn vuoksi.
          </li>
          <li>
            Jos maksu on suoritettu voucherilla, vastaava osuus katsotaan
            käytetyksi eikä sitä palauteta.
          </li>
        </UL>
      </Block>

      <Block>
        <H2>10. Terveysselvitys, allergiat ja vasta-aiheet</H2>
        <P>
          Asiakas vastaa terveystietojensa oikeellisuudesta ja siitä, että
          hänellä ei ole hoidolle vasta-aiheita (esim. allergiat, ihosairaudet,
          lääkitys, raskaus, sydänsairaudet, metalli-implantit, epilepsia, tuore
          rusketus/aurinkoaltistus, syöpähoidot, avohaavat tms.). Pyydämme
          ilmoittamaan herkästi allergioista ja aiemmista reaktioista ennen
          hoitoa. Epäselvissä tilanteissa asiakkaan tulee varmistaa hoidon
          soveltuvuus terveydenhuollon ammattilaiselta.
        </P>
        <P>
          Olet itse vastuussa siitä, että noudatat hoidon esivalmistelu- ja
          jälkihoito-ohjeita. Hoitotulokset ovat yksilöllisiä emmekä voi taata
          tiettyä lopputulosta.
        </P>
      </Block>

      <Block>
        <H2>11. Vastuunrajoitus</H2>
        <P>
          Emme vastaa välillisistä tai epäsuorista vahingoista, ellei pakottava
          lainsäädäntö toisin määrää. Kokonaisvastuu rajoittuu enintään kyseisen
          tilauksen arvoon. Tämä ei rajoita kuluttajan lakisääteisiä oikeuksia.
        </P>
      </Block>

      <Block>
        <H2>12. Henkilötietojen käsittely</H2>
        <P>
          Käsittelemme henkilötietoja
          <Link href="/privacy">Tietosuojaselosteen</Link> mukaisesti.
          Evästeiden käytöstä kerromme evästebannerissa.
        </P>
      </Block>

      <Block>
        <H2>13. Riidanratkaisu ja sovellettava laki</H2>
        <P>
          Pyrimme ensisijaisesti ratkaisemaan erimielisyydet asiakaspalvelun
          kautta. Ellei asia ratkea, kuluttaja voi saattaa sen
          <Link
            href="https://www.kuluttajariita.fi"
            target="_blank"
            rel="noopener"
          >
            Kuluttajariitalautakunnan
          </Link>
          käsiteltäväksi. Ennen sitä tulee olla yhteydessä
          <Link
            href="https://www.kuluttajaneuvonta.fi"
            target="_blank"
            rel="noopener"
          >
            Kuluttajaneuvontaan
          </Link>
          . Sovellettava laki on Suomen laki.
        </P>
      </Block>

      <Block>
        <H2>14. Ehtojen muutokset</H2>
        <P>
          Voimme päivittää näitä ehtoja, kun palvelu tai lainsäädäntö muuttuu.
          Uusin versio on aina tällä sivulla. Merkittävistä muutoksista
          ilmoitamme erikseen sivustolla tai sähköpostitse.
        </P>
      </Block>
    </Wrap>
  );
}
