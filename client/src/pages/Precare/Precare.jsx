import React from "react";
import styled from "styled-components";

const Wrap = styled.main`
  max-width: 920px;
  margin: 32px auto;
  padding: 0 16px 64px;
  line-height: 1.7;
  color: #1f2937;
`;
const H1 = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin: 12px 0 8px;
`;
const H2 = styled.h2`
  font-size: 20px;
  font-weight: 800;
  margin: 24px 0 8px;
`;
const Card = styled.section`
  background: #fff;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  margin: 16px 0;
`;
const List = styled.ul`
  margin: 8px 0 0 18px;
  li {
    margin: 6px 0;
  }
`;
const Muted = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-top: 12px;
`;

export default function Precare() {
  return (
    <Wrap>
      <H1>Ennen hoitoa – allergiat, vasta-aiheet & vastuut</H1>
      <Card>
        <p>
          Tämän sivun tarkoitus on auttaa sinua valitsemaan hoito turvallisesti.
          Kun varaat ajan tai ostat hoitovoucherin, hyväksyt alla olevat ehdot.
        </p>
      </Card>

      <H2>Asiakkaan vastuu</H2>
      <Card>
        <List>
          <li>Vahvistan, että antamani terveystiedot ovat oikeita.</li>
          <li>
            Ilmoitan etukäteen allergiat, lääkitykset, raskauden/imetystä jne.
          </li>
          <li>
            Ymmärrän, että testiherkistys voidaan suositella ennen ensimmäistä
            hoitoa.
          </li>
        </List>
      </Card>

      <H2>Allergiat & herkkyys</H2>
      <Card>
        <p>
          Tyypillisiä herkistäjiä: liimat, väriaineet, tuoksut, säilöntäaineet,
          lateksi, nikkeli.
        </p>
        <p>
          Oireita: punoitus, kutina, turvotus, kirvely, ihottuma, silmien vuoto.
        </p>
        <p>Vakavissa oireissa – soita 112.</p>
      </Card>

      <H2>Yleiset vasta-aiheet</H2>
      <Card>
        <List>
          <li>Aktiivinen iho-infektio, tulehdus tai avohaava hoitoalueella</li>
          <li>
            Isotretinoiini/antibiootit viime aikoina (kysy hoitokohtainen tauko)
          </li>
          <li>
            Viimeaikainen vahva kuorinta/mikroneulaus/laser samalla alueella
          </li>
          <li>Raskaus/imetys joissain hoidoissa</li>
          <li>
            Sydämentahdistin (laitteelliset hoidot), epilepsia, käynnissä oleva
            syöpähoito
          </li>
          <li>Allergia hoidon ainesosille</li>
        </List>
        <Muted>
          Huom: hoitokohtaiset ohjeet annetaan aina varauksen yhteydessä.
        </Muted>
      </Card>

      <H2>Ennen & jälkeen hoidon</H2>
      <Card>
        <p>
          <b>Ennen:</b> vältä aurinkoa 48-72 h, älä ärsytä ihoa, ilmoita
          lääkitykset, saavu terveenä.
        </p>
        <p>
          <b>Jälkeen:</b> vältä hikoilua/saunaa/uintia 24-48 h, käytä SPF 30-50,
          seuraa hoito-ohjeita.
        </p>
      </Card>

      <H2>Varaukset, peruutukset & voucherit</H2>
      <Card>
        <List>
          <li>
            Peruutus ≥24 h: 0 € • alle 24h: 50 % • alle 12 h / no-show: 100 %
          </li>
          <li>
            Kampanjahinta koskee vain voucherin ostoa & täyttä maksua verkossa.
          </li>
          <li>
            Voucher voimassa 30/60/90 päivää (kuponkikohtainen). Päättymisen
            jälkeen arvo vanhenee.
          </li>
          <li>Voucherin voi lahjoittaa toiselle ennen ajan käyttöä.</li>
        </List>
      </Card>

      <H2>Vastuunrajoitus</H2>
      <Card>
        <p>
          Hoidot tehdään ammattimaisesti. Emme vastaa ilmoittamatta jätetyistä
          sairauksista/allergioista tai ohjeiden laiminlyönnistä aiheutuvista
          reaktioista. Tavanomaiset, ohimenevät reaktiot eivät ole virhe.
          Tuotereklamaatiot tehdään viipymättä kuluttajansuojalain mukaisesti.
        </p>
      </Card>

      <H2>Tietosuoja</H2>
      <Card>
        <p>
          Käsittelemme tietoja ajanvarauksen, hoidon ja asiakasviestinnän
          hoitamiseksi. Lue lisää: <a href="/privacy">Tietosuojaseloste</a>.
        </p>
      </Card>

      <Muted>
        Ahti Pro Oy (KosmediK) • Y-tunnus 3281350-8 • info@kosmedik.eu •
        Kehruutie 4, Helsinki • Päivitetty 20.10.2025
      </Muted>
    </Wrap>
  );
}
