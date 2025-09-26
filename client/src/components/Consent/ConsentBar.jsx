import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import InfoIcon from "@mui/icons-material/Info";

const WRAP = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  ${mobile({ flexDirection: "column", alignItems: "stretch" })}
`;
const TXT = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #222;
`;
const BTN = styled.button`
  border: 0;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
`;
const OK = styled(BTN)`
  background: #2ecc71;
  color: #0b2518;
`;
const NO = styled(BTN)`
  background: #efefef;
  color: #333;
`;
const LINK = styled.a`
  color: #0a7cff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const KEY = "cookie_consent_choice";
export default function ConsentBar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (!v) setOpen(true);
  }, []);
  const choose = (val) => {
    localStorage.setItem(KEY, val); // "accept" | "deny"
    //
    setOpen(false);
  };
  if (!open) return null;
  return (
    <WRAP role="dialog" aria-label="Tietosuojalupa">
      <InfoIcon />
      <TXT>
        Käytämme evästeitä palvelun parantamiseksi ja analytiikkaan. Lue lisää
        <LINK href="/terms" target="_blank" rel="noopener">
          tietosuojasta
        </LINK>
        .
      </TXT>
      <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
        <NO onClick={() => choose("deny")}>Hylkään</NO>
        <OK onClick={() => choose("accept")}>Hyväksyn</OK>
      </div>
    </WRAP>
  );
}
