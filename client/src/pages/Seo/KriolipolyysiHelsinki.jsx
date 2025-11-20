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
  Small,
} from "../../components/SeoLayout/SeoLayout";

export default function KriolipolyysiHelsinki() {
  return (
    <SeoLayout
      title="Kriolipolyysi Helsinki – rasvan jäädytys turvallisesti"
      description="Kriolipolyysi eli rasvan jäädytys Helsingissä. 1 alue Malminkartanossa ja jopa 4 aluetta samalla kertaa Kannelmäessä. Tehokas tuki kehonmuokkaukseen ilman kirurgiaa."
      breadcrumbs={
        <>
          <Link to="/">Etusivu</Link> <span>/</span>{" "}
          <span>Kriolipolyysi Helsinki</span>
        </>
      }
      updated="18.11.2025"
    >
      <HighlightRow>
        <Tag>Rasvan jäädytys • Ei kirurgiaa</Tag>
        <CityTag>Helsinki – Kannelmäki &amp; Malminkartano</CityTag>
      </HighlightRow>
      <Section>
        <H2>Mikä on kriolipolyysi?</H2>
        <P>
          Kriolipolyysi on ei-kirurginen kehonmuokkausmenetelmä, jossa rasvaa
          sisältävää kudosta jäähdytetään hallitusti. Kylmäärsyke
          vaurioittaa rasvasoluja, minkä jälkeen keho poistaa niitä
          vähitellen aineenvaihdunnan kautta viikkojen aikana.
        </P>
        <P>
          Hoito sopii erityisesti alueille, joihin ruokavalio ja liikunta
          eivät yksin riitä, kuten vatsan, “jenkkakahvojen” tai lantion
          sitkeisiin rasvakertymiin.
        </P>
      </Section>
      <Section>
          <H2>Toimipisteet ja alueiden määrä</H2>
        <P>
          Kriolipolyysiä tehdään KosmeDiKissä kahdessa toimipisteessä hieman eri
          tavalla:
        </P>
        <Ul>
          <li>
            <strong>Malminkartano – Kehruutie 4:</strong> hoito{" "}
            <strong>yhdelle alueelle kerrallaan</strong>. Sopii, kun
            haluat keskittyä tarkasti yhteen ongelmakohtaan.
          </li>
          <li>
            <strong>Kannelmäki – Klaneettitie 6 A, 2. kerros:</strong>
            laitteella voidaan käsitellä{" "}
            <strong>jopa 4 aluetta samanaikaisesti</strong>, mikä on kätevää
            esimerkiksi vatsan ja kylkien hoitoon yhdellä hoitokerralla.
          </li>
        </Ul>
         
        <P>
          Molempiin pisteisiin on hyvät kulkuyhteydet{" "}
          <strong>Helsingistä, Vantaalta ja Espoosta</strong>, ja lähellä on
          maksuttomia pysäköintipaikkoja.
        </P>
      </Section>
      <Section>
          <H2>Kenelle kriolipolyysi sopii?</H2>
        <Ul>
          <li>Kun paino on melko vakaa, mutta tietyt alueet häiritsevät.</li>
          <li>
            Kun haluat ei-kirurgisen vaihtoehdon rasvakertymien pehmentämiseen.
          </li>
          <li>
            Olet valmis yhdistämään hoidon terveelliseen ruokavalioon
            ja liikuntaan.
          </li>
        </Ul>
         
        <P>
          Kriolipolyysi ei ole yleinen painonpudotusmenetelmä, vaan paikallisten
          rasvakertymien muotoiluun tarkoitettu tukitoimenpide. Teemme aina
          alkuhaastattelun ja tarvittaessa ohjaamme lääkärin arvioon ennen
          hoitosarjan aloittamista.
        </P>
      </Section>
      <Section>
        <H2>Valmistautuminen ja jälkihoito</H2>
        <H3>Ennen hoitoa</H3>
        <Ul>
          <li>Vältä voimakasta auringonottoa käsiteltävällä alueella.</li>
          <li>
            Älä tule hoitoon, jos alueella on ihorikko, tulehdus tai
            merkittävä mustelma.
          </li>
          <li>
            Kerro meille sairauksista ja lääkityksistä – kriolipolyysi ei
            sovi kaikille.
          </li>
        </Ul>
          <H3>Hoidon jälkeen</H3>
        <Ul>
          <li>
            Alue voi olla punainen, tunnottoman tuntuinen tai lievästi
            arka muutaman päivän ajan.
          </li>
          <li>
            Voit yleensä palata normaaliin arkeen heti hoidon jälkeen – kevyt
            liikkuminen tukee aineenvaihduntaa.
          </li>
          <li>
            Tulokset kehittyvät viikkojen aikana; tarkempi seurantasuunnitelma
            käydään läpi vastaanotolla.
          </li>
        </Ul>
      </Section>
      <Section>
          <H2>Miksi asiakkaat valitsevat KosmeDiKin kriolipolyysiin?</H2>
        <Ul>
          <li>
            Mahdollisuus valita yhden alueen tarkka hoito Malminkartanossa tai
            useamman alueen käsittely samalla kerralla Kannelmäessä.
          </li>
          <li>Rauhallinen ympäristö ja henkilökohtainen ohjaus.</li>
          <li>
            Mahdollisuus yhdistää kriolipolyysi muihin
            kehonmuokkaushoitoihin, kuten lipolaser-hoitoon, turvallisuus
            huomioiden.
          </li>
           
        </Ul>
      </Section>
      <Section>
          <H2>Usein kysytyt kysymykset</H2>
        <FAQItem>
          <summary>Sattuuko kriolipolyysi?</summary>
          <P>
            Alussa tuntuu voimakkaana imuna ja kylmänä, mutta useimmat
            tottuvat tunteeseen nopeasti. Hoidon jälkeen alue voi olla
            tunnottoman tuntuinen tai arka, mutta tämä on yleensä ohimenevää.
          </P>
        </FAQItem>
        <FAQItem>
              <summary>Kuinka monta hoitokertaa tarvitaan?</summary>         
          <P>
            Usein yhdelle alueelle tehdään<strong>1–3 hoitokertaa</strong>{" "}
            yksilöllisestä tilanteesta riippuen. Arvioidaan tämä aina
            konsultaatiossa.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Voinko yhdistää kriolipolyysin muihin hoitoihin?</summary>
          <P>
            Joissakin tapauksissa kriolipolyysi voidaan yhdistää
            esimerkiksi lipolaser-hoitoon. Suunnittelemme yhdistelmän aina
            turvallisuus edellä ja yksilöllisesti.
          </P>
           
        </FAQItem>
      </Section>
      <Section>
        <H3>Kriolipolyysi Helsinki – KosmeDiK</H3>
        <Price>alkaen €160</Price>
        <Small>
          Hinta riippuu käsiteltävien alueiden määrästä ja siitä,
          tehdäänkö hoito Malminkartanossa (1 alue) vai Kannelmäessä (jopa 4
          aluetta). Ajantasaiset hinnat näet{" "}
          <Link to="/treatments">Hoidot</Link>-sivulta.
        </Small>
        <CTA to="/treatment/rasvan-jaadytys-kryolipolyysi">Varaa aika</CTA>
      </Section>
      <Section>
        <H3>Sijainti ja pysäköinti</H3>       
        <AddressBox>
          <strong>KosmeDiK – Kannelmäki</strong>Klaneettitie 6 A, 2. kerros
          <br />
          00420 Helsinki
        </AddressBox>
        <AddressBox>
          <strong>KosmeDiK – Malminkartano</strong> Kehruutie 4 <br />
          00410 Helsinki
        </AddressBox>
        <P>
          Molemmissa toimipisteissä on hyvät julkiset yhteydet sekä maksutonta
          pysäköintiä. Sekä Vantaalta että Espoosta on helppo tulla junalla tai
          autolla.
        </P>
        <PillRow>
          <Pill>Kannelmäki</Pill>
          <Pill>Malminkartano</Pill>
          <Pill>Kriolipolyysi</Pill>
          <Pill>Kehonmuokkaus</Pill>
        </PillRow>
      </Section>
      <Section>
        <H3>Vastuuhuomautus</H3>       
        <P>
          Kriolipolyysi ei sovi kaikille, esimerkiksi tietyissä verenkierto- tai
          hermostosairauksissa. Kerrothan aina kaikki sairautesi ja lääkityksesi
          ennen hoidon aloittamista. Terveyshuolissa ohjaamme sinut lääkärin
          arvioon.
        </P>
        <Small>
          Varaamalla ajan hyväksyt <Link to="/terms">palveluehtomme</Link> sekä{" "}
          <Link to="/precare">hoito-ohjeet &amp; peruutusehdot</Link>.       
        </Small>
      </Section>
         
    </SeoLayout>
  );
}
