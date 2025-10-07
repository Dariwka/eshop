import React, { useEffect, useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import { mobile } from "../../responsive";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

/* ============ layout ============ */
const Container = styled.div`
  padding: 30px 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
  ${mobile({ padding: "12px" })}
`;
const SearchWrap = styled.div`
  display: grid;
  gap: 16px;
`;
const Head = styled.div`
  display: grid;
  gap: 12px;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 28px;
  text-align: center;
  ${mobile({ fontSize: "22px" })}
`;
const Form = styled.form`
  width: min(1000px, 94vw);
  margin: 0 auto;
`;
const Bar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Input = styled.input`
  flex: 1;
  height: 46px;
  border: 1px solid #d1d5db;
  padding: 0 12px;
  border-radius: 10px;
  font-size: 16px;
  &:focus {
    outline: 2px solid #a7f3d0;
    outline-offset: 1px;
  }
`;
const Button = styled.button`
  height: 46px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: #166534;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;
const Controls = styled.div`
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const Chip = styled.button`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${(p) => (p.$active ? "#166534" : "#d1d5db")};
  background: ${(p) => (p.$active ? "#ecfdf5" : "#fff")};
  color: ${(p) => (p.$active ? "#166534" : "#111827")};
  cursor: pointer;
`;
const Select = styled.select`
  height: 40px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 0 10px;
`;
const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${mobile({ gridTemplateColumns: "1fr" })}
`;
const Card = styled(Link)`
  display: grid;
  grid-template-rows: 190px auto;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: #fff;
  &:hover {
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  }
`;

const Pic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #fafafa;
`;
const Meta = styled.div`
  display: grid;
  gap: 6px;
  padding: 10px 12px 12px;
`;
const TypeBadge = styled.span`
  font-size: 12px;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 2px 8px;
  width: fit-content;
  color: #374151;
`;
const Name = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
`;
const Price = styled.div`
  font-weight: 700;
  color: #065f46;
`;

/* ============ helpers ============ */
function normalizeProduct(p) {
  const a = p?.attributes || {};
  return {
    type: "product",
    id: p.id,
    title: a.title || "",
    desc: a.desc || "",
    price: Number(a.price || 0),
    slug: a.slug || "",
    imgUrl: a?.img?.data?.attributes?.url || "",
    brand: a?.brands?.data?.[0]?.attributes?.title || "",
    category: a?.categories?.data?.[0]?.attributes?.title || "",
    tags: a?.tags || "",
    date: a?.createdAt || "",
    url: `/product/${encodeURIComponent(a.slug || p.id)}`,
  };
}
function normalizeTreatment(t) {
  const a = t?.attributes || {};
  return {
    type: "treatment",
    id: t.id,
    title: a.title || "",
    desc: a.desc || "",
    price: Number(a.price || 0),
    slug: a.slug || "",
    imgUrl: a?.img?.data?.attributes?.url || "",
    category: a?.sub_treat_categories?.data?.[0]?.attributes?.title || "",
    tags: a?.tags || "",
    date: a?.createdAt || "",
    url: `/treatment/${encodeURIComponent(a.slug || t.id)}`,
  };
}
function normalizeCourse(c) {
  const a = c?.attributes || {};
  return {
    type: "course",
    id: c.id,
    title: a.title || "",
    desc: a.desc || "",
    price: Number(a.price || 0),
    slug: a.slug || "",
    imgUrl: a?.img?.data?.attributes?.url || "",
    category: a?.sub_course_categories?.data?.[0]?.attributes?.title || "",
    tags: a?.tags || "",
    date: a?.createdAt || "",
    url: `/training/${encodeURIComponent(a.slug || c.id)}`,
  };
}
function scoreItem(q, item) {
  if (!q) return 1;
  const hay =
    `${item.title} ${item.desc} ${item.category} ${item.tags}`.toLowerCase();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  let s = 0;
  terms.forEach((t) => {
    if (hay.includes(t)) s += 2;
    if (item.title.toLowerCase().includes(t)) s += 3;
  });
  return s;
}
/* ============ component ============ */ export default function SearchPage() {
  const qCommon =
    `?publicationState=live` +
    `&fields[0]=title&fields[1]=desc&fields[2]=price&fields[3]=slug&fields[4]=createdAt` +
    `&populate[img][fields][0]=url` +
    `&populate[categories][fields][0]=title` +
    `&populate[sub_treat_categories][fields][0]=title` +
    `&populate[sub_course_categories][fields][0]=title`;
  const { data: prodRaw, loading: lp } = useFetch(`/products${qCommon}`);
  const { data: treatRaw, loading: lt } = useFetch(`/treatments${qCommon}`);
  const { data: courseRaw, loading: lc } = useFetch(`/courses${qCommon}`);
  const [query, setQuery] = useState("");
  const [view, setView] = useState({
    product: true,
    treatment: true,
    course: true,
  });
  const [sort, setSort] = useState("relevance");
  const allItems = useMemo(() => {
    const ps = Array.isArray(prodRaw) ? prodRaw.map(normalizeProduct) : [];
    const ts = Array.isArray(treatRaw) ? treatRaw.map(normalizeTreatment) : [];
    const cs = Array.isArray(courseRaw) ? courseRaw.map(normalizeCourse) : [];
    return [...ps, ...ts, ...cs];
  }, [prodRaw, treatRaw, courseRaw]);
  const results = useMemo(() => {
    const filtered = allItems.filter((it) => view[it.type]);
    const scored = filtered
      .map((it) => ({ ...it, _score: scoreItem(query, it) }))
      .filter((it) => (query ? it._score > 0 : true));
    const sorted = [...scored].sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "newest") return new Date(b.date) - new Date(a.date);
      if (b._score !== a._score) return b._score - a._score;
      return a.title.localeCompare(b.title);
    });
    return sorted;
  }, [allItems, view, query, sort]);
  const onSubmit = useCallback((e) => e.preventDefault(), []);
  const loading = lp || lt || lc;
  return (
    <Container>
      <SearchWrap>
        <Head>
          <Title>Haku</Title>
          <Form onSubmit={onSubmit}>
            <Bar>
              <Input
                type="search"
                placeholder="Hae tuotteita, hoitoja tai koulutuksia..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Haku"
              />
              <Button type="submit">Hae</Button>
            </Bar>
          </Form>
          <Controls>
            <Chip
              $active={view.product}
              onClick={() => setView((v) => ({ ...v, product: !v.product }))}
            >
              Tuotteet
            </Chip>
            <Chip
              $active={view.treatment}
              onClick={() =>
                setView((v) => ({ ...v, treatment: !v.treatment }))
              }
            >
              Hoidot
            </Chip>
            <Chip
              $active={view.course}
              onClick={() => setView((v) => ({ ...v, course: !v.course }))}
            >
              Koulutukset
            </Chip>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="relevance">Järjestä: Osuvuus</option>
              <option value="priceAsc">Hinta (edullisin ensin)</option>
              <option value="priceDesc">Hinta (kallein ensin)</option>
              <option value="newest">Uusimmat ensin</option>
            </Select>
          </Controls>
        </Head>
        {loading ? (
          <LoadingButton loading />
        ) : (
          <Results>
            {results.map((it) => (
              <Card to={it.url} key={`${it.type}-${it.id}`}>
                <Pic
                  src={it.imgUrl}
                  alt={it.title}
                  loading="lazy"
                  decoding="async"
                />
                <Meta>
                  <TypeBadge>
                    {it.type === "product"
                      ? "Tuote"
                      : it.type === "treatment"
                      ? "Hoito"
                      : "Koulutus"}
                  </TypeBadge>
                  <Name>{it.title}</Name>
                  {!!it.price && <Price>€{Number(it.price).toFixed(0)}</Price>}
                </Meta>
              </Card>
            ))}
          </Results>
        )}
      </SearchWrap>
    </Container>
  );
}
