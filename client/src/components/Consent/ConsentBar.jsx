import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

const KEY = "privacyConsent";
// "accept" | "deny"
export default function ConsentBar() {
  const [open, setOpen] = useState(false); // Показываем баннер только если согласие ещё не дано

  //
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      setOpen(!v);
    } catch {
      setOpen(true);
    }
  }, []);
  const choose = (val) => {
    try {
      localStorage.setItem(KEY, val);
    } catch {}
    setOpen(false);
  };
  if (!open) return null;
  return (
    <Wrap
      role="dialog"
      aria-modal="false"
      aria-label="Evästeiden suostumus"
      aria-live="polite"
    >
      <Inner>
        <Icon aria-hidden="true">i</Icon>
        <Text>
          Käytämme evästeitä palvelun parantamiseksi ja analytiikkaan. Lue lisää
          <Link href="/privacy" target="_blank" rel="noopener">
            tietosuojaselosteesta
          </Link>
          .
        </Text>
        <Actions>
          <BtnSecondary type="button" onClick={() => choose("deny")}>
            Hylkään
          </BtnSecondary>
          <BtnPrimary type="button" onClick={() => choose("accept")}>
            Hyväksyn
          </BtnPrimary>
        </Actions>
      </Inner>
    </Wrap>
  );
}
/* =========================== styles =========================== */
const Wrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900; /* ниже твоего промо-модала (у тебя было ~999) */
  padding: 12px;
  pointer-events: none; /* контейнер пропускает клики, а содержимое — нет */
  ${mobile({ padding: "10px" })}
`;
const Inner = styled.div`
  pointer-events: auto;
  max-width: 980px;
  margin: 0 auto;
  background: rgba(17, 24, 39, 0.92);
  color: #e5e7eb;
  border-radius: 14px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  ${mobile({ gridTemplateColumns: "40px 1fr", gap: "12px", padding: "12px" })}
`;
const Icon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #ffffff;
  user-select: none;
`;
const Text = styled.p`
  margin: 0;
  line-height: 1.45;
  font-size: 15px;
  ${mobile({ fontSize: "14px" })}
`;
const Link = styled.a`
  color: #93c5fd;
  text-decoration: underline;
  text-underline-offset: 2px;
  &:hover {
    text-decoration-thickness: 2px;
  }
`;
const Actions = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  gap: 10px;
  ${mobile({ gridColumn: "1 / -1", width: "100%", gridAutoFlow: "row" })}
`;
const BtnBase = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  transition: transform 0.06s ease, filter 0.15s ease;
  &:active {
    transform: translateY(1px);
  }
  ${mobile({
    width: "100%", // на мобилке кнопки — на всю ширину
    //
  })}
`;
const BtnPrimary = styled(BtnBase)`
  background: #16a34a;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(22, 163, 74, 0.35);
  &:hover {
    filter: brightness(1.05);
  }
`;
const BtnSecondary = styled(BtnBase)`
  background: rgba(255, 255, 255, 0.1);
  color: #e5e7eb;
  border: 1px solid rgba(255, 255, 255, 0.18);
  &:hover {
    filter: brightness(1.08);
  }
`;
