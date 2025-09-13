import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  line-height: 1.7;
  color: #222;
  font-size: 16px;

  p {
    margin: 0 0 10px;
  }
  ul,
  ol {
    margin: 0 0 12px 20px;
    padding: 0;
  }
  li {
    margin: 4px 0;
  }
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }

  h3 {
    margin: 16px 0 8px;
    font-size: 18px;
    color: #0e2902;
  }
`;

// маркеры
const isBullet = (s) => /^(\u2022|•|-|\*)\s+/.test(s);
const stripBullet = (s) => s.replace(/^(\u2022|•|-|\*)\s+/, "");
const isNumbered = (s) => /^\d+\.\s+/.test(s);
const stripNumber = (s) => s.replace(/^\d+\.\s+/, "");

// лёгкая инлайн-разметка
const inline = (s) =>
  s
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(
      /\bhttps?:\/\/[^\s)]+/g,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );

// заголовки #, ##, ###
const isHeader = (s) => /^#{1,3}\s+/.test(s);
const stripHeader = (s) => s.replace(/^#{1,3}\s+/, "");

// Q/A разбиение: "Вопрос? — Ответ" или "Вопрос? - Ответ"
const splitQA = (s) => {
  const m = s.match(/^(.+\?)\s*[–—-]\s*(.+)$/); // en dash, em dash, hyphen
  return m ? { q: m[1], a: m[2] } : null;
};

export default function Description({ text = "" }) {
  const lines = String(text).replace(/\r/g, "").split("\n");

  const blocks = [];
  let ul = null;
  let ol = null;

  const flushUL = () => {
    if (ul?.length) blocks.push({ type: "ul", items: ul });
    ul = null;
  };
  const flushOL = () => {
    if (ol?.length) blocks.push({ type: "ol", items: ol });
    ol = null;
  };
  const flushLists = () => {
    flushUL();
    flushOL();
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushLists();
      blocks.push({ type: "br" });
      continue;
    }

    // заголовок
    if (isHeader(line)) {
      flushLists();
      blocks.push({ type: "h3", text: stripHeader(line) });
      continue;
    }

    // Q/A «Вопрос? — Ответ»
    const qa = splitQA(line);
    if (qa) {
      flushLists();
      blocks.push({ type: "p", text: `**${qa.q}**` });
      blocks.push({ type: "p", text: qa.a });
      continue;
    }

    // списки
    if (isBullet(line)) {
      flushOL();
      (ul ||= []).push(stripBullet(line));
      continue;
    }
    if (isNumbered(line)) {
      flushUL();
      (ol ||= []).push(stripNumber(line));
      continue;
    }

    // обычный абзац
    flushLists();
    blocks.push({ type: "p", text: line });
  }
  flushLists();

  // убираем подряд идущие <br>
  const compact = [];
  let seenBr = false;
  for (const b of blocks) {
    if (b.type === "br") {
      seenBr = true;
      continue;
    }
    if (seenBr && b.type === "p" && !b.text) {
      seenBr = false;
      continue;
    }
    seenBr = false;
    compact.push(b);
  }

  return (
    <Wrap>
      {compact.map((b, i) => {
        if (b.type === "h3")
          return (
            <h3 key={i} dangerouslySetInnerHTML={{ __html: inline(b.text) }} />
          );
        if (b.type === "p")
          return (
            <p key={i} dangerouslySetInnerHTML={{ __html: inline(b.text) }} />
          );
        if (b.type === "ul")
          return (
            <ul key={i}>
              {b.items.map((t, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inline(t) }} />
              ))}
            </ul>
          );
        if (b.type === "ol")
          return (
            <ol key={i}>
              {b.items.map((t, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inline(t) }} />
              ))}
            </ol>
          );
        return null;
      })}
    </Wrap>
  );
}
