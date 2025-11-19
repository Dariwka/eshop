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

export default function RipsienpidennysHelsinki() {
  return (
    <SeoLayout
      title="Ripsienpidennys Helsinki – luonnollinen tai näyttävä katse"
      description="Ammattilaisen tekemä ripsienpidennys Helsingissä. Klassiset ja volyymiripset Kannelmäessä ja Malminkartanossa – helppo tulla myös Vantaalta ja Espoosta."
      breadcrumbs={
        <>
          <Link to="/">Etusivu</Link> <span>/</span>
          <span>Ripsienpidennys Helsinki</span>
        </>
      }
      updated="18.11.2025"
    >
      <HighlightRow>
        <Tag>Klassiset • Volyymi • Kevyt luonnollinen look</Tag>
        <CityTag>Helsinki – Kannelmäki &amp; Malminkartano</CityTag>
      </HighlightRow>
      <Section>
        <H2>Mikä on ripsienpidennys?</H2>
        <P>
          Ripsienpidennys tarkoittaa yksittäisten synteettisten
          ripsien kiinnittämistä omiin ripsiin ripsiliimalla. Lopputulos voi
          olla hyvin luonnollinen tai selvästi näyttävä – tyyli valitaan
          aina yhdessä asiakkaan kanssa.
        </P>
        <P>
          KosmeDiKissä teemme ripsienpidennyksiä huolellisella tekniikalla,
          huomioiden ripsiesi kunnon ja silmien herkkyyden. Tavoitteemme
          on kevyt ja mukava tunne, ei raskas tai pistelevä fiilis.
        </P>
      </Section>
      <Section>
        <H2>Kaksi studiota Helsingissä</H2>
        <P>Ripsienpidennystä tarjoamme kahdessa toimipisteessä:</P>
        <Ul>
          <li>
            <strong>Kannelmäki – Klaneettitie 6 A, 2. kerros</strong> – noin 2
            tunnin maksuton pysäköinti lähialueella ja juna-asema kävelymatkan
            päässä.
          </li>
          <li>
            <strong>Malminkartano – Kehruutie 4</strong> – jopa 4 tuntia
            maksutonta pysäköintiä ja nopea yhteys Malminkartanon juna-asemalta.
          </li>
        </Ul>
        <P>
          Meille on helppo tulla eri puolilta pääkaupunkiseutua – monet
          asiakkaistamme saapuvat{" "}
          <strong>Helsingistä, Vantaalta ja Espoosta</strong>. Juna tuo perille
          noin 5–10 minuutin kävelymatkan päähän kummastakin studiosta.
        </P>
      </Section>
      <Section>
        <H2>Millaisia ripsiä teemme?</H2>
        <Ul>
          <li>
            <strong>Klassinen ripsienpidennys</strong> – yksi kuitu yhteen omaan
            ripseen, luonnollinen ja siisti lopputulos.
          </li>
          <li>
            <strong>Kevyet volyymiripset</strong> – ohuista kuiduista koottu
            tuuheampi viuhka, pehmeä ja ilmava lopputulos.
          </li>
          <li>
            <strong>Tyylin räätälöinti</strong> – pituus, kaarevuus ja tuuheus
            suunnitellaan kasvojen ja silmien mallin mukaan.
          </li>
        </Ul>
        <P>
          Huomioimme aina ripsiesi lähtötilanteen, jotta pidennykset
          ovat mahdollisimman kevyet ja omia ripsiäsi kunnioittavat.
        </P>
      </Section>
      <Section>
        <H2>Valmistautuminen ja jälkihoito</H2>
        <H3>Ennen aikaa</H3>
        <Ul>
          <li>Tule paikalle puhtain, meikittömin silmin.</li>
          <li>
            Vältä vedenkestävää ripsiväriä ja öljyisiä puhdistustuotteita 24 h
            ennen hoitoa.
          </li>
          <li>
            Jos sinulla on ollut voimakkaita allergisia silmäreaktioita,
            kerrothan tästä etukäteen – voimme tarvittaessa tehdä
            herkkyystestin.
          </li>
        </Ul>
        <H3>Ripsienpidennysten jälkihoito</H3>
        <Ul>
          <li>Vältä kastelua ensimmäiset 24 h hoidon jälkeen.</li>
          <li>
            Puhdista ripset säännöllisesti ripsienpuhdistusaineella – näin
            ehkäiset ärsytystä ja pidennät pysyvyyttä.{" "}
          </li>
          <li>
            Älä hiero silmiä tai nyplää ripsiä – anna kuitujen irrota
            luonnollisen kasvusyklin mukaan.
          </li>
          <li>Vältä öljypohjaisia meikinpoistoaineita silmien alueella.</li>
        </Ul>
      </Section>
      <Section>
        <H2>Miksi asiakkaat valitsevat KosmeDiKin ripsienpidennykseen?</H2>
        <Ul>
          <li>Rauhallinen ja kiireetön hoito – aikaa varataan riittävästi.</li>
          <li>
            Kevyet materiaalit ja huolellinen erottelutekniikka,
            jotka kunnioittavat omia ripsiä.
          </li>
          <li>
            Mahdollisuus luonnolliseen “your lashes but better” -lookiin tai
            näyttävämpään volyymiin.
          </li>
          <li>
            Selkeät hoito-ohjeet ja rehellinen arvio sopivuudesta –    emme tee
            ripsiä, jotka rasittaisivat liikaa omia ripsiäsi.
          </li>
        </Ul>
      </Section>
      <Section>
        <H2>Usein kysytyt kysymykset (UKK)</H2>
        <FAQItem>
          <summary>Sattuuko ripsienpidennys?</summary>
          <P>
            Itse laitto ei satu. Silmät pidetään kiinni koko hoidon ajan ja
            liima ei saa päästä silmiin. Saat pitää taukoja, jos tunnet
            ännitystä niskassa tai selässä.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Kuinka usein huolto tulisi tehdä?</summary>
          <P>
            Useimmiten <strong>3–4 viikon välein</strong>, riippuen
            omien ripsiesi kasvurytmistä ja siitä, kuinka tuuheaa lopputulosta
            toivot ylläpidettävän.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Voinko käyttää ripsiväriä pidennysten kanssa?</summary>
          <P>
            Emme suosittele ripsiväriä, jotta pidennysten pysyvyys ja ripsien
            puhtaus pysyvät mahdollisimman hyvänä. Jos käytät, vältä
            vedenkestäviä tuotteita ja poista meikki hellävaraisesti.
          </P>
        </FAQItem>
        <FAQItem>
          <summary>Sopiiko ripsienpidennys kaikille?</summary>
          <P>
            Ripsienpidennys ei välttämättä sovi hyvin herkkäsilmäisille
            tai voimakkaista allergioista kärsiville. Jos olet epävarma, voit
            aloittaa kevyemmällä tyylillä tai varata konsultaatioajan.
          </P>
        </FAQItem>
      </Section>
      <Section>
        <H3>Ripsienpidennys Helsinki – KosmeDiK</H3>
        <Price>alkaen €65</Price>
        <P>
          Hinta riippuu valitusta tekniikasta (klassinen / volyymi) ja
          ajankäytöstä. Ajantasaiset hinnat löydät{" "}
          <Link to="/treatments">Hoidot</Link>-sivulta sekä etusivun
          tarjouksista.
        </P>
        <CTA to="/booking">Varaa aika</CTA>
      </Section>
      <Section>
        <H3>Sijainti ja pysäköinti</H3>
        <AddressBox>
          <strong>KosmeDiK – Kannelmäki</strong> Klaneettitie 6 A, 2. kerros{" "}
          <br /> 00420 Helsinki
        </AddressBox>
        <AddressBox>
          <strong>KosmeDiK – Malminkartano</strong>   Kehruutie 4 <br /> 00410
          Helsinki
        </AddressBox>

        <P>
          Kummastakin studiosta on lyhyt kävelymatka juna-asemalle. Autolla
          saapuessa Kannelmäessä on noin 2h ja Malminkartanossa jopa
          4h maksutonta pysäköintiä lähialueilla (tarkista liikennemerkit).
        </P>
        <PillRow>
          <Pill>Kannelmäki</Pill>
          <Pill>Malminkartano</Pill>
          <Pill>Helsinki</Pill>
          <Pill>Ripsienpidennys</Pill>
        </PillRow>
      </Section>
      <Section>
        <H3>Vastuuhuomautus</H3>
        <P>
          Ripsienpidennys on kosmeettinen hoito, joka ei sovi kaikille.
          Allergiset reaktiot ovat mahdollisia, vaikka ne ovat harvinaisia. Jos
          sinulla on silmäsairauksia tai vakavia allergioita, keskustele ensin
          lääkärisi kanssa. Voimme tarvittaessa tehdä herkkyystestin ennen
          varsinaista hoitoa.
        </P>
        <P>
          Varaamalla ajan hyväksyt <Link to="/terms">palveluehtomme</Link> sekä{" "}
          <Link to="/precare">hoito-ohjeet &amp; peruutusehdot</Link>.
        </P>
      </Section>
    </SeoLayout>
  );
}
