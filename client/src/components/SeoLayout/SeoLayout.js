import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { mobile } from "../../responsive";
import { Helmet } from "react-helmet";

/* ---------- общая раскладка ---------- */

export const Page = styled.main`
  min-height: 100vh;
  background: #f5f5f7;
  padding: 32px 0 48px;

  ${mobile({
    padding: "20px 0 32px",
  })}
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;

  ${mobile({
    padding: "0 12px",
  })}
`;

export const Breadcrumbs = styled.nav`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 16px;

  a {
    color: inherit;
    text-decoration: none;
  }

  span {
    margin: 0 4px;
  }
`;

export const H1 = styled.h1`
  font-size: 32px;
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 12px;
  color: #111827;

  ${mobile({
    fontSize: "24px",
  })}
`;

export const Lead = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: #4b5563;
  max-width: 720px;
  margin-bottom: 24px;

  ${mobile({
    fontSize: "15px",
  })}
`;

export const HighlightRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Tag = styled.div`
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  background: #ecfdf5;
  color: #047857;
`;

export const CityTag = styled(Tag)`
  background: #eef2ff;
  color: #3730a3;
`;

/* ---------- контентные блоки ---------- */

export const Section = styled.section`
  background: #ffffff;
  border-radius: 18px;
  padding: 20px 18px 18px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  margin-bottom: 20px;

  ${mobile({
    padding: "16px 14px 14px",
  })}
`;

export const H2 = styled.h2`
  font-size: 20px;
  margin: 0 0 10px;
  color: #111827;
  font-weight: 700;

  ${mobile({
    fontSize: "18px",
  })}
`;

export const H3 = styled.h3`
  font-size: 17px;
  margin: 16px 0 8px;
  color: #111827;
  font-weight: 600;
`;

export const P = styled.p`
  font-size: 15px;
  line-height: 1.7;
  margin: 0 0 10px;
  color: #4b5563;
`;

export const Ul = styled.ul`
  padding-left: 18px;
  margin: 4px 0 10px;

  li {
    font-size: 15px;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 4px;
  }
`;

export const Ol = styled.ol`
  padding-left: 20px;
  margin: 4px 0 8px;

  li {
    font-size: 15px;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 4px;
  }
`;

export const FAQItem = styled.details`
  border-radius: 14px;
  background: #f3f4ff;
  padding: 10px 14px;
  margin-top: 10px;

  summary {
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #111827;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  p {
    margin-top: 6px;
    font-size: 14px;
  }
`;

/* ---------- правые / доп. карточки (если понадобятся) ---------- */

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 18px 18px 14px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  font-size: 14px;
  color: #4b5563;
`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #16a34a;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    color: #9ca3af;
    margin-left: 8px;
    text-decoration: line-through;
  }
`;

export const CTA = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  background: #16a34a;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(22, 163, 74, 0.4);
  transition: background 0.15s ease, transform 0.08s ease, box-shadow 0.15s ease;

  &:hover {
    background: #15803d;
    transform: translateY(-1px);
    box-shadow: 0 12px 30px rgba(22, 163, 74, 0.45);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 18px rgba(22, 163, 74, 0.35);
  }
`;

export const Small = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: #6b7280;
  margin-top: 6px;
`;

export const AddressBox = styled.div`
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.6;

  strong {
    display: block;
    font-weight: 700;
    color: #111827;
  }
`;

export const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

export const Pill = styled.span`
  font-size: 12px;
  padding: 4px 9px;
  border-radius: 999px;
  background: #e5e7eb;
  color: #374151;
`;

export const Updated = styled.p`
  margin-top: 18px;
  font-size: 12px;
  color: #9ca3af;
`;

/* ---------- сам layout ---------- */

export default function SeoLayout({
  title,
  description,
  breadcrumbs,
  updated,
  children,
}) {
  const fullTitle = title
    ? `${title} | KosmeDiK`
    : "KosmeDiK – kauneushoitola Helsingissä";

  // Для canonical / og:url (в CRA ок, без SSR)
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.kosmedik.eu";

  return (
    <Page>
      <Helmet>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={fullTitle} />
        {description && (
          <meta property="og:description" content={description} />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      <Container>
        {breadcrumbs && (
          <Breadcrumbs aria-label="breadcrumbs">{breadcrumbs}</Breadcrumbs>
        )}

        {title && <H1>{title}</H1>}
        {description && <Lead>{description}</Lead>}

        {children}

        {updated && <Updated>Päivitetty: {updated}</Updated>}
      </Container>
    </Page>
  );
}
