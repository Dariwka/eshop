import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { mobile } from "../../responsive";
import Card from "../../components/Card/Card";
import CardCourse from "../../components/CardCourse/CardCourse";

const Wrap = styled.div`
  padding: 30px 50px;
  display: grid;
  gap: 24px;
  ${mobile({ padding: "16px", gap: "16px" })}
`;
const Hero = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  align-items: center;
  ${mobile({ gridTemplateColumns: "1fr", textAlign: "center" })}
`;
const Logo = styled.img`
  width: 220px;
  height: 160px;
  object-fit: contain;
  border-radius: 14px;
  background: #fafafa;
  justify-self: center;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 28px;
`;
const Desc = styled.p`
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
`;
const Section = styled.section`
  display: grid;
  gap: 14px;
`;
const H2 = styled.h2`
  margin: 0;
  font-size: 22px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  ${mobile({ gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" })}
`;
const Empty = styled.div`
  color: #6b7280;
`;
const Brand = () => {
  const { slug } = useParams();
  const url =
    `/brands?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&fields[0]=title&fields[1]=desc&fields[2]=slug` +
    `&populate[img][fields][0]=url` +
    `&populate[products][populate][img][fields][0]=url` +
    `&populate[products][populate][img2][fields][0]=url` +
    `&populate[products][fields][0]=title&populate[products][fields][1]=price&populate[products][fields][2]=oldPrice&populate[products][fields][3]=slug` +
    `&populate[courses][populate][img][fields][0]=url` +
    `&populate[courses][populate][img2][fields][0]=url` +
    `&populate[courses][fields][0]=title&populate[courses][fields][1]=price&populate[courses][fields][2]=date&populate[courses][fields][3]=time&populate[courses][fields][4]=slug`;

  const { data, loading, error } = useFetch(url);
  const brand = Array.isArray(data) ? data?.[0] : data?.data?.[0];
  const attrs = brand?.attributes || {};
  if (error) return <Wrap>Something went wrong</Wrap>;
  if (loading)
    return (
      <Wrap>
        <LoadingButton loading />
      </Wrap>
    );
  if (!brand) return <Wrap>Brand not found</Wrap>;
  const logo = attrs?.img?.data?.attributes?.url || "";
  const products = attrs?.products?.data || [];
  const courses = attrs?.courses?.data || [];
  return (
    <Wrap>
      <Hero>
        {logo && (
          <Logo src={logo} alt={attrs.title} loading="lazy" decoding="async" />
        )}
        <div>
          <Title>{attrs.title}</Title>
          {attrs.desc && <Desc>{attrs.desc}</Desc>}
        </div>
      </Hero>
      <Section>
        <H2>Products</H2>
        {products.length ? (
          <Grid>
            {products.map((p) => (
              <Card key={p.id} item={p} />
            ))}
          </Grid>
        ) : (
          <Empty>No products yet</Empty>
        )}
      </Section>
      <Section>
        <H2>Courses</H2>
        {courses.length ? (
          <Grid>
            {courses.map((c) => (
              <CardCourse key={c.id} item={c} />
            ))}
          </Grid>
        ) : (
          <Empty>No courses yet</Empty>
        )}
      </Section>
    </Wrap>
  );
};
export default Brand;
