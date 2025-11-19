import React from "react";
import { Link } from "react-router-dom";
import SeoLayout, {
  CTA,
  Lead,
  HighlightRow,
  Tag,
  CityTag,
  Section,
  H2,
  H3,
  P,
  Ul,
  Ol,
  FAQItem,
  Price,
  Small,
  AddressBox,
  PillRow,
  Pill,
} from "../../components/SeoLayout/SeoLayout";

// ---------- component ----------
export default function LipolaserHoitoHelsinki() {
  return (
    <SeoLayout
      title="Lipolaser-hoito Helsingissä – rasvanpoisto ilman kirurgiaa"
      description="Lipolaser-hoito Helsingissä Kannelmäessä. Ei kirurgiaa, ei puudutusta – hellävarainen kehonmuokkaus paikallisiin rasvakertymiin KosmeDiKissä."
      breadcrumbs={
        <>
          <Link to="/">Etusivu</Link>
          <span>/</span> <span>Lipolaser-hoito Helsinki</span>{" "}
        </>
      }
      updated="18.11.2025"
    >
      <Lead>
        Lipolaser-hoito on hellävarainen tapa vähentää paikallista rasvakudosta
        ilman leikkausta ja pitkää toipumisaikaa. KosmeDiKissä Kannelmäessä
        yhdistämme modernin teknologian rauhalliseen, asiantuntevaan
        hoitoympäristöön.
      </Lead>
      <HighlightRow>
        <Tag>Ei kirurgiaa • Ei puudutusta • Nopea paluu arkeen</Tag>         
        <CityTag>Helsinki - Kannelmäki • 2 h maksuton pysäköinti</CityTag>   
      </HighlightRow>
              {/* Основной SEO-контент в одной колонке */}       
      <Section>
        <H2>Mikä on lipolaser-hoito?</H2>         
        <P>
          Lipolaser-hoito on ei-kirurginen kehonmuokkausmenetelmä,
          jossa matalatehoinen laservalo kohdistetaan käsiteltävälle
          alueelle. Laservalo aktivoi rasvasoluja vapauttamaan sisältöään, joka
          poistuu aineenvaihdunnan kautta. Hoito tuntuu yleensä miellyttävältä,
          eikä se vaadi puudutusta.
        </P>
           
        <P>
          Lipolaser-hoito sopii hyvin alueille, joihin ruokavalio ja liikunta 
          eivät yksin riitä:
        </P>
        <Ul>
          <li>vatsa ja vyötärö</li>
          <li>lantiot ja niin kutsutut jenkkakahvat</li>
          <li>reidet ja pakarat</li>
          <li>käsivarret</li>
          <li>leuka- ja kaula-alue (tarvittaessa)</li>         
        </Ul>
        <P>
          Hoito ei ole painonpudotusmenetelmä, vaan tarkoitettu paikallisten 
          rasvakertymien pehmentämiseen ja alueen muotoiluun. Parhaat  tulokset
          saadaan, kun hoito yhdistetään terveelliseen ruokavalioon  ja
          säännölliseen liikkumiseen.
        </P>
      </Section>
      <Section>
        <H2>Miten lipolaser-hoito etenee KosmeDiKissä?</H2>         
        <Ol>
          <li>
            <strong>Kartoitus ja konsultaatio.</strong> Käymme läpi toiveesi,
            terveydentilasi ja mahdolliset vasta-aiheet. Tarvittaessa ohjaamme
            sinut lääkärin arvioon ennen hoitoa.
          </li>
          <li>
            <strong>Mittaukset ja kuvat (halutessasi).</strong> Voimme
            mitata käsiteltävän alueen ja ottaa ennen ja jälkeen-kuvat
            hoitosarjan seuraamista varten.
          </li>
          <li>
            <strong>Varsinainen hoito.</strong> Laserlevyt asetetaan iholle noin
            20-40 minuutiksi alueesta ja hoitosuunnitelmasta riippuen. Hoito
            tuntuu yleensä miellyttävältä lämpönä.
          </li>
          <li>
            <strong>Jälkihoito ja ohjeet.</strong> Hoidon jälkeen voit
            palata heti normaaliin arkeen. Suosittelemme veden juontia ja
            kevyttä liikkumista aineenvaihdunnan tueksi.
          </li>
        </Ol>
        <P>
          Yksi hoitokerta on yleensä 30-60 minuuttia. Usein suositellaan 4-8
          kerran hoitosarjaa, jotta tulos olisi mahdollisimman tasainen ja 
          pitkäkestoinen.         
        </P>
      </Section>
      <Section>
        <H2>Tulokset, hoitokertojen määrä ja kesto</H2>         
        <P>
          Tulokset ovat yksilöllisiä ja riippuvat muun muassa lähtötilanteesta,
          elintavoista ja hoitosarjan pituudesta. Moni asiakas huomaa ihon 
          tasoittuvan ja vaatteiden istuvan paremmin jo ensimmäisten 
          hoitokertojen jälkeen.         
        </P>
        <P>
          Hoitoalueen tilavuus voi pienentyä useiden viikkojen aikana, kun keho
          käsittelee rasvakudosta. Siksi on tärkeää noudattaa annettuja ohjeita
          ja tulla hoitosarjan käynneille sovitusti.       
        </P>
        <H3>Kuinka monta kertaa tarvitaan?</H3>         
        <Ul>
          <li>pieni alue: tyypillisesti 4-6 hoitokertaa</li>
          <li>laajempi alue: tyypillisesti 6-8 hoitokertaa</li>
          <li>ylläpito: yksittäisiä hoitoja tarvittaessa</li>         
        </Ul>
        <P>Hoitosuunnitelma tehdään aina yksilöllisesti konsultaatiossa.</P>   
      </Section>
       
      <Section>
        <H2>Kenelle lipolaser-hoito sopii ja kenelle ei?</H2>
        <H3>Sopii yleensä, kun</H3>         
        <Ul>
          <li>paino on melko vakaa eikä merkittävää ylipainoa ole</li>       
          <li>
            sinulla on paikallisia rasvakertymiä, jotka eivät reagoi
            ruokavalioon ja liikuntaan 
          </li>
            <li>toivot ei-kirurgista, lempeää vaihtoehtoa</li>           
          <li>
            olet valmis sitoutumaan hoitosarjaan ja terveellisiin elintapoihin 
          </li>
        </Ul>
        <H3>Hoitoa ei tehdä, jos sinulla on esimerkiksi</H3>         
        <Ul>
          <li>
            sydämentahdistin, vakava sydänsairaus tai vaikea verisuonisairaus 
          </li>
            <li>aktiivinen syöpä tai vakava hoitamaton sairaus</li>           
          <li>
            merkittävä maksa- tai munuaissairaus, joka heikentää
            aineenvaihduntaa 
          </li>
            <li>raskaus tai imetys</li> 
          <li>infektio tai ihosairaus käsiteltävällä alueella</li> 
          <li>
            muu hoitajan arvioima vasta-aihe tai tilanne, jossa hoito ei sovi
            lääkärisi ohjeisiin 
          </li>
        </Ul>
        <P>
          Kerro meille aina kaikista sairauksista, lääkityksestä
          ja mahdollisista implanteista ennen hoitoa. Asiakas vastaa
          antamiensa tietojen oikeellisuudesta. Terveyshuolissa suosittelemme
          kääntymään lääkärin puoleen ennen ajanvarausta.         
        </P>
      </Section>
      <Section>
        <H2>Usein kysytyt kysymykset</H2>         
        <FAQItem>
          <summary>Sattuuko lipolaser-hoito?</summary> 
          <P>
            Hoito tuntuu useimmista asiakkailta vain miellyttävänä lämpönä tai
            paineena. Emme käytä neuloja tai kirurgiaa, eikä
            puudutusta tarvita.           
          </P>
        </FAQItem>
        <FAQItem>
            <summary>Paljonko lipolaser-hoito maksaa?</summary>           
          <P>
            Hinta riippuu käsiteltävästä alueesta ja hoitokertojen määrästä.
            Ajankohtaiset hinnat ja kampanjat löydät sivulta{" "}
            <Link to="/treatments">Hoidot</Link> sekä etusivun
            tarjouksista. Hinnat sisältävät arvonlisäveron. 
          </P>
        </FAQItem>
        <FAQItem>
            <summary>Kuinka nopeasti voin palata arkeen?</summary>           
          <P>
            Yleensä heti hoidon jälkeen voit jatkaa normaalia päivääsi.
            Suosittelemme kevyttä liikkumista ja riittävää veden juontia
            hoitopäivänä ja seuraavina päivinä. 
          </P>
        </FAQItem>
        <FAQItem>
           <summary>Voinko yhdistää lipolaserin muihin hoitoihin?</summary>
          <P>
            Joissakin tapauksissa lipolaser voidaan yhdistää
            esimerkiksi kryolipolyysiin tai lymfahoitoon. Suunnittelemme
            yhdistelmät aina yksilöllisesti, jotta hoito on turvallinen ja
            tarkoituksenmukainen. 
          </P>
        </FAQItem>
      </Section>
      <Section>
        <H3>Lipolaser-hoito Helsinki - KosmeDiK</H3>         
        <Price>
          alkaen €45<span>€65</span>         
        </Price>
               
        <Small>
          Tarkka hinta riippuu alueesta ja hoitokertojen määrästä. Ajankohtaiset
          kampanjat näet Hoidot-sivulta ja etusivun tarjouksista.         
        </Small>
        <CTA to="/treatment/lipo-laser-laitteellinen-lipolyysi">Varaa</CTA>     
         
      </Section>
      <Section>
        <H3>Sijainti ja pysäköinti</H3>         
        <AddressBox>
            <strong>KosmeDiK - Ahti Pro Oy</strong>  Klaneettitie 6 A, 2.kerros{" "}
          <br />
           00420 Helsinki (Kannelmäki)         
        </AddressBox>
        <P>
          Studiomme sijaitsee lyhyen kävelymatkan päässä
          Kannelmäen juna-asemalta. Autolla tuleville on noin 2 tunnin
          maksuton pysäköinti läheisillä paikoitusalueilla (tarkista
          liikennemerkit paikan päällä).
        </P>
        <PillRow>
          <Pill>Kannelmäki</Pill>
          <Pill>Helsinki</Pill>
          <Pill>Lipolaser-hoito</Pill>
          <Pill>Kehonmuokkaus</Pill>
        </PillRow>
      </Section>
      <Section>
        <H3>Vastuuhuomautus</H3>         
        <P>
          Lipolaser-hoito ei korvaa tervettä ruokavaliota eikä lääkärin hoitoa.
          Tulokset ovat yksilöllisiä, eikä tiettyä lopputulosta  voida taata.
          Jos sinulla on perussairauksia, sydän- tai  verisuonisairaus, syöpä
          tai epävarmuutta hoidon sopivuudesta,  keskustele aina lääkärin kanssa
          ennen ajanvarausta.         
        </P>
           
        <Small>
          Varaamalla ajan hyväksyt <Link to="/terms">palveluehtomme</Link>sekä{" "}
          <Link to="/precare">hoito-ohjeet ja peruutusehdot</Link>.     
        </Small>
      </Section>
    </SeoLayout>
  );
}
