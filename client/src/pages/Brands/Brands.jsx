import React, { useState } from "react";
import styled from "styled-components";
import ListBrand from "../../components/ListBrand/ListBrand";
import { mobile } from "../../responsive";

/* ===== styles ===== */
const Page = styled.div`
  padding: 24px 50px;
  ${mobile({ padding: "16px" })}
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-bottom: 18px;
`;

const Search = styled.input`
  width: 100%;
  max-width: 520px;
  height: 40px;
  border-radius: 999px;
  padding: 0 14px;
  border: 1px solid #ddd;
  outline: none;
  &:focus {
    border-color: #bbb;
  }
`;

const Letters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const LetterBtn = styled.button`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #ddd;
  background: ${(p) => (p.active ? "#111" : "#fff")};
  color: ${(p) => (p.active ? "#fff" : "#111")};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  &:hover {
    border-color: #bbb;
  }
`;

/* ===== component ===== */
const letters = [
  "All",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Brands = () => {
  const [letter, setLetter] = useState("All");
  const [q, setQ] = useState("");

  const onLetterClick = (ch) => {
    setLetter(ch);
    setQ(""); // при выборе буквы очищаем поиск
  };

  const onSearch = (e) => {
    setQ(e.target.value);
    setLetter("All"); // при поиске отключаем букву
  };

  return (
    <Page>
      <Controls>
        <Search placeholder="Search brand..." value={q} onChange={onSearch} />

        <Letters>
          {letters.map((ch) => (
            <LetterBtn
              key={ch}
              onClick={() => onLetterClick(ch)}
              active={letter === ch}
            >
              {ch}
            </LetterBtn>
          ))}
        </Letters>
      </Controls>

      <ListBrand letter={letter} q={q} />
    </Page>
  );
};

export default Brands;
