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

export default function DiodilaserHelsinki() {
  return (
    <SeoLayout
      title="Diodilaser karvanpoisto Helsinki – tehokas ja hellävarainen ratkaisu"
      description="Diodilaser-karvanpoisto Helsingissä. Tehokas ja pitkäkestoinen tulos ilman vahaa ja höylää. Hoidot Kannelmäessä ja Malminkartanossa – helppo tulla myös Vantaalta ja Espoosta."
      breadcrumbs={
        <>
          <Link to="/">Etusivu</Link> <span>/</span>
          <span>Diodilaser karvanpoisto Helsinki</span>
        </>
      }
      updated="18.11.2025"
    >
      <HighlightRow>
        <Tag>Pitkäkestoinen karvanpoisto • Diodilaser</Tag>
        <CityTag>Helsinki – Kannelmäki &amp; Malminkartano</CityTag>
      </HighlightRow>
      <Section>
        <H2>Mikä on diodilaser-karvanpoisto?</H2>
        <P>
          Diodilaser-karvanpoisto on tehokas tapa vähentää
          pysyvästimei-toivottuja ihokarvoja. Laser kohdistuu karvan juurta
          ympäröivään melaniiniin ja heikentää karvan uusiutumiskykyä.
          Hoitosarja vähentää karvankasvua selvästi – monilla alueilla karva
          muuttuu hennommaksi ja harvemmaksi.
        </P>
        <P>
          KosmeDiKissä käytämme moderneja laitteita ja yksilöllisiä asetuksia,
          jotta hoito olisi mahdollisimman tehokas ja samalla ihoasi
          kunnioittava.
        </P>
      </Section>
      <Section>
        <H2>Kaksi toimipistettä Helsingissä</H2>
        <P>Diodilaser-hoitoja tehdään kahdessa studiossa:</P>
        <Ul>
          <li>
            <strong>Kannelmäki – Klaneettitie 6 A, 2. kerros</strong> – noin
            2h maksuton pysäköinti ja lyhyt kävelymatka Kannelmäen
            juna-asemalta.
          </li>
          <li>
            <strong>Malminkartano – Kehruutie 4</strong> – jopa 4h
            maksuton pysäköinti ja nopeat junayhteydet.
          </li>
        </Ul>
        <P>
          Meille on helppo tulla eri puolilta pääkaupunkiseutua –
          palvelemme asiakkaita{" "}
          <strong>Helsingistä, Vantaalta ja Espoosta</strong>.
        </P>
      </Section>
      <Section>
        <H2>Kenelle diodilaser-hoito sopii?</H2>
        <Ul>
          <li>Sinulle, joka haluat vähentää karvankasvua pitkäkestoisesti.</li>
          <li>
            Soveltuu useimmille ihotyypeille – arvioimme sopivuuden
            aina henkilökohtaisesti.
          </li>
          <li>
            Erityisen suosittua kainaloihin, sääriin, bikinialueelle ja
            kasvojen alueen häiritseviin karvoihin.
          </li>
        </Ul>
        <P>
          Hoitosarja räätälöidään ihosi, karvasi ja toiveidesi mukaan.
          Kaikki eivät kuitenkaan ole laser-karvanpoistoon sopivia – siksi
          aloitamme aina huolellisella kartoituksella.
        </P>
      </Section>
      <Section>
        <H2>Valmistautuminen ja jälkihoito</H2>
        <H3>Ennen hoitoa</H3>
        <Ul>
          <li>Aja käsiteltävä alue 12–24 h ennen hoitoa.</li>
          <li>
            Vältä solariumia ja voimakasta auringonottoa ennen hoitosarjaa.
          </li>
          <li>
            Kerro meille lääkityksistä ja sairauksista – jotkin lääkkeet
            voivat herkistää ihoa valolle.
          </li>
        </Ul>
        <H3>Hoidon jälkeen</H3>
        <Ul>
          <li>
            Vältä saunaa, kuumia kylpyjä ja hikoilua saman vuorokauden aikana.
          </li>
          <li>
            Rauhoita ihoa tarvittaessa viilentävällä geelillä tai kevyellä
            kosteusvoiteella.
          </li>
          <li>
            Suojaa alue auringolta – käytä korkeaa suojakerrointa hoitosarjan
            ajan.
          </li>
        </Ul>
      </Section>
      <Section>
        <H2>Miksi asiakkaat valitsevat KosmeDiKin diodilaser-hoitoon?</H2>
        <Ul>
          <li>Yksilöllinen kartoitus ennen hoitosarjaa.</li>
          <li>
            Rauhallinen hoitoympäristö ja selkeät ohjeet ennen ja jälkeen
            hoidon.
          </li>
          <li>
            Mahdollisuus yhdistää hoito muihin palveluihin – kuten sokerointiin
            tai ihonhoitoon – turvallisuus huomioiden.
          </li>
        </Ul>
      </Section>
      <Section>
        <H2>Usein kysytyt kysymykset</H2>
        <FAQItem>
          <summary>Sattuuko diodilaser-karvanpoisto?</summary>
          <P>
            Tuntemus on yksilöllinen. Useimmat kuvailevat hoitoa
            nipisteleväksi lämmöksi ei varsinaiseksi kivuksi. Voimme säätää
            tehoa tuntemuksesi mukaan.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Kuinka monta hoitokertaa tarvitaan?</summary>
          <P>
            Usein suositellaan <strong>6–8 hoitokertaa</strong> alueesta ja
            karvan paksuudesta riippuen. Tarkan arvion saat konsultaatiossa.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Voinko ottaa hoidon kesällä?</summary>
          <P>
            Se on mahdollista, kunhan vältät liiallista auringonottoa ja suojaat
            ihon hyvin. Kerromme sinulle tarkat ohjeet tilanteesi mukaan.
          </P>
        </FAQItem>
      </Section>
      <Section>
        <H3>Diodilaser karvanpoisto Helsinki – KosmeDiK</H3>
        <Price>
          alkaen €300 <span>€390</span>
        </Price>
        <Small>
          Hinta riippuu käsiteltävästä alueesta ja hoitosarjan
          pituudesta. Ajantasaiset hinnat näet{" "}
          <Link to="/treatment/brasilian-bikini-paketti-diodilaser-karvanpoisto">
            Hoidot
          </Link>
          -sivulta sekä etusivun tarjouksista.
        </Small>
        <CTA to="/treatment/brasilian-bikini-paketti-diodilaser-karvanpoisto">
          Varaa aika
        </CTA>
      </Section>
      <Section>
        <H3>Sijainti ja pysäköinti</H3>
        <AddressBox>
          <strong>KosmeDiK – Kannelmäki</strong>Klaneettitie 6 A, 2. kerros   
          <br />
          00420 Helsinki
        </AddressBox>
        <AddressBox>
          <strong>KosmeDiK – Malminkartano</strong>Kehruutie 4 
          <br />
           00410 Helsinki
        </AddressBox>
        <P>
          Molemmista toimipisteistä on hyvät junayhteydet ja
          maksutonta pysäköintiä lähialueilla. Kannelmäki on erityisen kätevä
          myös Vantaalta ja Espoosta tuleville.
        </P>
        <PillRow>
          <Pill>Kannelmäki</Pill>
          <Pill>Malminkartano</Pill>
          <Pill>Diodilaser</Pill>
          <Pill>Karvanpoisto</Pill>
        </PillRow>
      </Section>
      <Section>
        <H3>Vastuuhuomautus</H3>
        <P>
          Diodilaser-karvanpoisto ei sovi kaikille. Jos sinulla
          on valoherkistävä lääkitys, aktiivinen ihosairaus tai epävarmuutta
          hoidon sopivuudesta, keskustelethan ensin lääkärisi kanssa. Annamme
          aina hoidon turvallisuus edellä.
        </P>
        <Small>
          Varaamalla ajan hyväksyt <Link to="/terms">palveluehtomme</Link> sekä
          <Link to="/precare">hoito-ohjeet &amp; peruutusehdot</Link>.
        </Small>
      </Section>
    </SeoLayout>
  );
}
