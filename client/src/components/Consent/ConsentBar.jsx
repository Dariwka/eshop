import React, { useEffect, useState } from "react";
import styled from "styled-components";

const KEY = "cookieConsent"; // "accept" | "deny" | null

const WRAP = styled.div`
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 1200; /* выше промо-модалки */
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(17, 24, 39, 0.92);
  color: #e5e7eb;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px);
`;

const InfoIcon = styled.span`
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #334155;
  color: #fff;
  font-weight: 900;
`;

const TXT = styled.p`
  margin: 0;
  line-height: 1.4;
  font-size: 14px;
  a {
    color: #60a5fa; /* голубая ссылка */
    text-decoration: underline;
  }
`;

const NO = styled.button`
  margin-left: auto;
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #64748b;
  background: transparent;
  color: #e5e7eb;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: rgba(100, 116, 139, 0.25);
  }
`;

const OK = styled.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 10px;
  border: none;
  background: #16a34a;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(22, 163, 74, 0.35);
  &:hover {
    background: #15803d;
  }
`;

export default function ConsentBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (!v) setOpen(true);
  }, []);

  const choose = (val) => {
    localStorage.setItem(KEY, val); // "accept" | "deny"
    setOpen(false);
  };

  if (!open) return null;

  return (
    <WRAP role="dialog" aria-label="Tietosuojalupa">
      <InfoIcon>i</InfoIcon>
      <TXT>
        Käytämme evästeitä palvelun parantamiseksi ja analytiikkaan. Lue lisää{" "}
        <a href="/privacy" target="_blank" rel="noopener">
          tietosuojaselosteesta
        </a>
        .
      </TXT>
      <NO onClick={() => choose("deny")}>Hylkään</NO>
      <OK onClick={() => choose("accept")}>Hyväksyn</OK>
    </WRAP>
  );
}
