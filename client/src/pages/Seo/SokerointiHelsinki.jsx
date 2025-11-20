import React from "react";
import { Link } from "react-router-dom";
import SeoLayout, {
  HighlightRow,
  Tag,
  CityTag,
  Section,
  H2,
  H3,
  P,
  Ul,
  FAQItem,
  Price,
  CTA,
  AddressBox,
  PillRow,
  Pill,
} from "../../components/SeoLayout/SeoLayout";

export default function SokerointiHelsinki() {
  return (
    <SeoLayout
      title="Sokerointi Helsinki – hellävarainen karvanpoisto KosmeDiKissä"
      description="Ammattilaisen tekemä sokerointi Helsingissä. Kainalot, sääret, brasilialainen, kasvot ja vartalo. Kaksi toimipistettä: Kannelmäki ja Malminkartano – helppo yhteys myös Vantaalta ja Espoosta."
      breadcrumbs={
        <>
          <Link to="/">Etusivu</Link> <span>/</span>{" "}
          <span>Sokerointi Helsinki</span>
        </>
      }
      updated="18.11.2025"
    >
      {/* надписи-чипсы под заголовком */}
      <HighlightRow>
        <Tag>Kainalot • Sääret • Brassi • Kasvot &amp; vartalo</Tag>
        <CityTag>Helsinki – Kannelmäki &amp; Malminkartano</CityTag>
      </HighlightRow>
      {/* --- карточки-секции как на Lipolaser-странице --- */}
      <Section>
        <H2>Mikä on sokerointi?</H2>
        <P>
          Sokerointi on hellävarainen ja tehokas tapa poistaa ei-toivottuja
          ihokarvoja kasvoilta ja vartalolta. Sokerimassa tarttuu pääasiassa
          karvaan, ei ehjään ihoon, joten hoito sopii hyvin myös
          monille herkälle iholle.{" "}
        </P>
        <P>
          KosmeDiKissä käytämme ammattitasoisia sokerointituotteita
          ja rauhallista, huolellista tekniikkaa, jotta iho jää
          mahdollisimman sileäksi ja ärtymättömäksi.
        </P>
      </Section>
      <Section>
        <H2>Sokerointi kahdessa toimipisteessä</H2>
        <P>
          Teemme sokerointia sekä{" "}
          <strong>Kannelmäessä (Klaneettitie 6 A, 2. krs)</strong> että{" "}
          <strong>Malminkartanossa (Kehruutie 4)</strong>. Molemmissa
          toimipisteissä hoito tehdään rauhallisessa ja
          yksityisessä hoitohuoneessa.
        </P>
        <P>
          Studiollemme on helppo tulla eri puolilta pääkaupunkiseutua – monet
          asiakkaat tulevat <strong>Helsingistä, Vantaalta ja Espoosta</strong>.
          Junayhteydet Kannelmäkeen ja Malminkartanoon ovat nopeat, ja
          lähistöllä on maksuttomia pysäköintipaikkoja (Kannelmäessä noin 2 h,
          Malminkartanossa jopa 4 h – tarkista liikennemerkit paikan päällä).
        </P>
      </Section>
      <Section>
        <H2>Miksi valita sokerointi?</H2>
        <Ul>
          <li>Sokeri tarttuu pääasiassa karvaan, ei ehjään ihoon</li>
          <li>
            Karva poistetaan karvan kasvusuunnassa, mikä voi vähentää
            sisäänkasvaneiden karvojen riskiä
          </li>
          <li>
            Iho jää usein pehmeäksi ja sileäksi ilman voimakasta punoitusta
          </li>
          <li>Luonnonmukainen koostumus, ei hajusteita tai hartseja</li>
        </Ul>
      </Section>
      <Section>
        <H2>Miksi asiakkaat valitsevat KosmeDiKin sokeroinnin?</H2>
        <Ul>
          <li>
            <strong>Mahdollisimman hellävarainen tekniikka.</strong>{" "}
            Työskentelemme rauhallisesti ja kuuntelemme koko ajan oloasi, jotta
            hoito tuntuisi mahdollisimman miellyttävältä.
          </li>
          <li>
            <strong>Nopea, mutta huolellinen hoito.</strong> Keskitymme tarkkaan
            tekniikkaan, emme tarpeettomaan kiireeseen.
          </li>
          <li>
            <strong>Aktiivinen hoito sisäänkasvaneita karvoja vastaan.</strong>{" "}
            Käytämme ammattimaisia tuotteita, kuten{" "}
            <em>Terra puhdistusgeeliä karvankasvun ehkäisyyn</em> ennen hoitoa
            ja hoidon jälkeen.
          </li>
          <li>
            <strong>Ihonhoito on osa palvelua.</strong> Annamme sinulle
            myös yksilölliset kotihoito-ohjeet, jotta iho pysyy rauhallisena
            ja sileänä mahdollisimman pitkään.
          </li>
        </Ul>
      </Section>
      <Section>
        <H2>Mitkä alueet voidaan sokeroida?</H2>
        <Ul>
          <li>Kasvot (mm. ylähuuli, posket, leuka)</li>
          <li>Kainalot</li>
          <li>Sääret, reidet, koko jalat</li>
          <li>Brazilialainen sokerointi (naisille)</li>
          <li>Selkä, rinta, vatsa (tarvittaessa)</li>
        </Ul>
      </Section>
      <Section>
        <H2>Valmistautuminen sokerointiin</H2>
        <Ul>
          <li>
            Karvan pituus noin 3–5 mm – älä aja aluetta juuri ennen hoitoa
          </li>
          <li>
            Vältä voimakasta kuorintaa, solariumia ja saunaa hoitoa
            edeltävänä päivänä
          </li>
          <li>
            Kerrothän meille mahdollisista lääkityksistä ja iho-oireista
            ennen hoitoa
          </li>
        </Ul>
      </Section>
      <Section>
        <H2>Mahdolliset reaktiot ja jälkihoito</H2>
        <P>
          Hoidon jälkeen alueella voi esiintyä hetkellistä punoitusta ja
          herkkyyttä. Tämä on normaalia ja lievittyy yleensä muutamien
          tuntien aikana.
        </P>
        <Ul>
          <li>Vältä hikoilua, saunaa ja solariumia 24 tunnin ajan</li>
          <li>Käytä kevyttä, hajusteetonta kosteusvoidetta</li>
          <li>Älä raavi tai hankaa käsiteltyä aluetta</li>
        </Ul>
      </Section>
      <Section>
        <H2>Usein kysytyt kysymykset (UKK)</H2>
        <FAQItem>
          <summary>Sattuuko sokerointi?</summary>
          <P>
            Tuntemus on yksilöllinen. Ensimmäinen kerta voi tuntua
            herkemmältä, mutta moni kokee sokeroinnin miellyttävämpänä kuin
            vahauksen. Etenemme rauhallisesti ja tarkistamme tuntemuksesi hoidon
            aikana.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Kuinka usein sokerointiin kannattaa tulla?</summary>
          <P>
            Yleensä <strong>4–6 viikon välein</strong>, riippuen karvan         
              kasvurytmistä ja käsiteltävästä alueesta. Säännöllinen sokerointi
            voi ohentaa ja harventaa karvaa ajan myötä.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Sopiiko sokerointi herkälle iholle?</summary>
          <P>
            Usein kyllä, mutta jos sinulla on esimerkiksi aktiivinen ihottuma
            tai rikkoutunut iho, aluetta ei voida käsitellä.
            Epävarmassa tilanteessa voit aina ottaa meihin yhteyttä ennen ajan
            varaamista.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Mistä päin asiakkaat tulevat?</summary>
          <P>
            Palvelemme asiakkaita koko pääkaupunkiseudulta. Kannelmäkeen
            ja Malminkartanoon on helppo tulla sekä{" "}
            <strong>Helsingistä,Vantaalta että Espoosta</strong>
            julkisilla kulkuvälineillä tai omalla autolla.
          </P>
        </FAQItem>
      </Section>
      <Section>
        <H3>Sokerointi Helsinki – KosmeDiK</H3>
        <Price>alkaen €10</Price>
        <P>
          Tarkka hinta riippuu alueesta ja valitusta palvelusta (esim.kainalot,
          sääret, brasilialainen). Ajankohtaiset hinnat ja kampanjat löydät{" "}
          <Link to="/treatment">Hoidot</Link> -sivulta sekä
          etusivun tarjouksista. Hinnat sisältävät ALV:n.
        </P>
        <CTA to="/treatment/paketti-kainalot-saeaeret-ja-brassi-1">
          Varaa aika
        </CTA>
      </Section>

      <Section>
        <H3>Sijainti ja pysäköinti</H3>
        <AddressBox>
          <strong>KosmeDiK – Ahti Pro Oy</strong>Klaneettitie 6 A, 2.kerros
          <br />
          00420 Helsinki (Kannelmäki)
        </AddressBox>
        <AddressBox>
          <strong>KosmeDiK – Malminkartano</strong>Kehruutie 4<br />
          00410 Helsinki(Malminkartano)
        </AddressBox>
        <P>
          Molemmat studiot sijaitsevat lyhyen kävelymatkan päässä juna-asemilta.
          Kannelmäessä on noin 2 tunnin maksuton pysäköinti lähialueilla,
          Malminkartanossa jopa 4 h – tarkista aina liikennemerkit paikan
          päällä.
        </P>
        <PillRow>
          <Pill>Kannelmäki</Pill>
          <Pill>Malminkartano</Pill>
          <Pill>Helsinki</Pill>
          <Pill>Sokerointi</Pill>
        </PillRow>
      </Section>
      <Section>
        <H3>Vastuuhuomautus</H3>
        <P>
          {" "}
          Sokerointi ei korvaa lääkärin hoitoa. Jos sinulla on perussairauksia,
          ihosairauksia tai käytät lääkitystä, joka ohentaa ihoa,
          keskustele lääkärisi kanssa ennen hoitoa. Käsiteltävällä alueella ei
          saa olla rikkoutunutta ihoa, tulehdusta tai aktiivista ihottumaa.
        </P>
        <P>
          Varaamalla ajan hyväksyt <Link to="/terms">palveluehtomme</Link> sekä{" "}
          <Link to="/precare">hoito-ohjeet &amp; peruutusehdot</Link>.
        </P>
      </Section>
    </SeoLayout>
  );
}
