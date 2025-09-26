import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { mobile } from "../../responsive"; // ← как в остальных компонентах

// ================= helpers =================
// Если у тебя настроен proxy ("/api" → бекенд), можно оставить "/api".// Иначе выставь REACT_APP_API_URL="https://<твой-домен>/api"
//
const API_URL = process.env.REACT_APP_API_URL || "/api";

function buildQuery() {
  const nowIso = new Date().toISOString();
  const fields = [
    "title",
    "price",
    "promoEnabled",
    "promoPrice",
    "promoStartsAt",
    "promoEndsAt",
    "slug",
  ];
  const p = new URLSearchParams();
  fields.forEach((f, i) => p.append(`fields[${i}]`, f));
  p.append("publicationState", "live");
  p.append("filters[promoEnabled][$eq]", "true");
  p.append("filters[promoEndsAt][$gte]", nowIso);
  p.append("populate[img][fields][0]", "url");
  p.append("sort", "promoEndsAt:asc");
  return `/treatments?${p.toString()}`;
}
function inPromoWindow(a) {
  if (!a?.promoEnabled) return false;
  const start = a?.promoStartsAt ? new Date(a.promoStartsAt).getTime() : 0;
  const end = a?.promoEndsAt ? new Date(a.promoEndsAt).getTime() : 0;
  const now = Date.now();
  return (start ? now >= start : true) && (end ? now <= end : true);
}
function activePrice(a) {
  return inPromoWindow(a) && a?.promoPrice
    ? Number(a.promoPrice)
    : Number(a?.price || 0);
}
function getImgUrl(a) {
  return a?.img?.data?.attributes?.url || "";
}
function toDDHHMMSS(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const dd = Math.floor(s / 86400);
  const hh = Math.floor((s % 86400) / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return {
    dd: String(dd).padStart(2, "0"),
    hh: String(hh).padStart(2, "0"),
    mm: String(mm).padStart(2, "0"),
    ss: String(ss).padStart(2, "0"),
  };
}

// ================ styles (в духе treatments/product) ================

const appear = keyframes` from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;
const pulse = keyframes` 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); }`;
const blink = keyframes` 0%, 49% { opacity: 1; } 50%,100%{ opacity: .15; }`;
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(17, 24, 39, 0.45);
  display: grid;
  place-items: center;
  padding: 16px;
`;
const Modal = styled.div`
  width: min(640px, 92vw);
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: ${appear} 0.18s ease-out both;
  overflow: hidden;
  ${mobile({ width: "min(520px, 94vw)", borderRadius: "16px" })}
`;
const Head = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px 8px 16px;
`;
const Badge = styled.span`
  background: red;
  color: white;
  border-radius: 999px;
  font-weight: 800;
  font-size: 14px;
  padding: 6px 10px;
`;
const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #242e3e;
  ${(p) =>
    p.$urgent &&
    css`
      color: #b91c1c;
      animation: ${pulse} 1.2s ease-in-out infinite;
    `}
  ${mobile({ fontSize: "16px" })}
`;
const Close = styled.button`
  appearance: none;
  position: absolute;
  top: 10px;
  right: 12px;
  width: 36px; /* было 32px — чуть крупнее */
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #111827; /* тёмный цвет иконки */
  font-size: 18px; /* больше «Х» */
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 1;
  transition: background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease,
    transform 0.06s ease;
  &:hover {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
  &:active {
    transform: scale(0.96);
  }
  &:focus-visible {
    outline: 2px solid #2563eb; /* видимый focus */
    outline-offset: 2px;
  }
`;

const Body = styled.div`
  padding: 10px 16px 6px 16px;
`;
const Pic = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16/10;
  object-fit: cover;
  border-radius: 16px;
  ${mobile({ borderRadius: "14px" })}
`;
const Caption = styled.div`
  text-align: center;
  color: #6b7280;
  margin-top: 10px;
`;
const PriceRow = styled.div`
  text-align: center;
  margin: 6px 0 2px;
  b {
    font-size: 28px;
    color: #065f46;
  }
  s {
    color: #9ca3af;
    margin-left: 10px;
  }
  ${mobile({ "& b": { fontSize: "26px" } })}
`;

const TimerRow = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: center;
  gap: 18px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
  color: #065f46;
  ${(p) =>
    p.$urgent &&
    css`
      color: #b91c1c;
      animation: ${pulse} 1.4s ease-in-out infinite;
    `}
  ${mobile({ gap: "12px", fontSize: "13px" })}
`;

const TimerCell = styled.div`
  display: grid;
  gap: 2px;
  line-height: 1.1;
  text-align: center;
  & > b {
    font-size: 18px;
  }
  & > span {
    font-size: 11px;
    color: #9ca3af;
  }
`;
const Colon = styled.span`
  align-self: center;
  font-weight: 800;
  opacity: 0.6;
  animation: ${blink} 1s steps(1, end) infinite;
`;
const SecondsValue = styled.b`
  animation: ${blink} 1s steps(1, end) infinite;
`;
const Footer = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 8px;
  padding: 12px 16px 16px;
`;
const NavBtn = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: #eef2ff;
  color: #3730a3;
  font-weight: 900;
  font-size: 18px;
  &:hover {
    background: #e0e7ff;
  }
  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;
const Cta = styled.button`
  appearance: none;
  border: none;
  justify-self: center;
  min-width: 160px;
  height: 44px;
  padding: 0 24px;
  border-radius: 999px;
  background: #166534;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(22, 101, 52, 0.35);
  &:hover {
    background: #15803d;
  }
`;

// ================= component =================

export default function PromoSquareModal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(
    () => !sessionStorage.getItem("promoClosed")
  );
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const [now, setNow] = useState(Date.now());
  const tickRef = useRef(null);
  const autoRef = useRef(null); // fetch (один раз)
  //
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = `${API_URL}${buildQuery()}`;
        console.info("[PromoSquareModal] fetch:", url);
        const r = await fetch(url, { credentials: "include" });
        const ct = r.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          console.error("[PromoSquareModal] fetch error: content-type", ct);
          return;
        }
        const json = await r.json();
        const list = (json?.data || [])
          .map((it) => ({
            id: it.id,
            ...it.attributes,
            imgUrl: getImgUrl(it.attributes),
          }))
          .filter((a) => inPromoWindow(a) && a.imgUrl && a.slug);
        if (!alive) return;
        setItems(list);
        setIdx(0);
        console.info("[PromoSquareModal] items:", list.length);
      } catch (e) {
        console.error("[PromoSquareModal] fetch error:", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []); // lock scroll

  //
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]); // секундный тик

  //
  useEffect(() => {
    if (!open) return;
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [open]); // автокарусель 5с

  //
  const startAuto = useCallback(() => {
    if (autoRef.current || items.length <= 1) return;
    autoRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, 5000);
  }, [items.length]);
  const stopAuto = useCallback(() => {
    if (!autoRef.current) return;
    clearInterval(autoRef.current);
    autoRef.current = null;
  }, []);
  useEffect(() => {
    if (!open) return;
    startAuto();
    return () => stopAuto();
  }, [open, startAuto, stopAuto]);
  const closeModal = useCallback(() => {
    stopAuto();
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = null;
    sessionStorage.setItem("promoClosed", "1");
    setOpen(false);
  }, [stopAuto]);
  const goTo = useCallback(
    (slug) => {
      if (!slug) return;
      navigate(`/treatment/${encodeURIComponent(slug)}`);
      closeModal();

      // закрываем при переходе
      //
    },
    [navigate, closeModal]
  );
  if (!open || items.length === 0) {
    console.debug(
      "[PromoSquareModal] hidden. open:",
      open,
      "items:",
      items.length
    );
    return null;
  }
  const it = items[idx];
  const priceNow = activePrice(it);
  const old = Number(it.price || 0);
  const discount = old > 0 ? Math.round((1 - priceNow / old) * 100) : null;
  const endsMs = it?.promoEndsAt ? new Date(it.promoEndsAt).getTime() - now : 0;
  const { dd, hh, mm, ss } = toDDHHMMSS(endsMs);
  const urgent = endsMs > 0 && endsMs < 3 * 60 * 60 * 1000; // < 3 часа
  return (
    <Overlay role="dialog" aria-modal="true">
      <Modal onMouseEnter={stopAuto} onMouseLeave={startAuto}>
        <Head>
          <Badge>TARJOUS!</Badge>
          <Title $urgent={urgent}>
            Pidä kiirettä — tarjous päättyy pian
            {discount !== null ? ` (${discount}%)` : ""}
          </Title>
          <Close aria-label="Sulje" onClick={closeModal}>
            ×
          </Close>
        </Head>
        <Body>
          <Pic src={it.imgUrl} alt={it.title} loading="lazy" decoding="async" />
          <Caption>{it.title}</Caption>
          <PriceRow>
            <b>€{Number(priceNow).toFixed(0)}</b>
            {old > priceNow ? <s>€{Number(old).toFixed(0)}</s> : null}
          </PriceRow>
          <TimerRow $urgent={urgent} aria-label="Tarjouksen loppumiseen">
            <TimerCell>
              <b>{dd}</b> <span>Päivää</span>
            </TimerCell>
            <Colon>:</Colon>
            <TimerCell>
              <b>{hh}</b> <span>Tuntia</span>
            </TimerCell>
            <Colon>:</Colon>
            <TimerCell>
              <b>{mm}</b> <span>Min</span>
            </TimerCell>
            <Colon>:</Colon>
            <TimerCell>
              <SecondsValue>{ss}</SecondsValue> <span>Sek</span>
            </TimerCell>
          </TimerRow>
        </Body>
        <Footer>
          <NavBtn
            onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
            disabled={items.length <= 1}
            aria-label="Edellinen"
          >
            ‹
          </NavBtn>
          <Cta onClick={() => goTo(it.slug)} aria-label="Katso">
            Katso
          </Cta>
          <NavBtn
            onClick={() => setIdx((i) => (i + 1) % items.length)}
            disabled={items.length <= 1}
            aria-label="Seuraava"
          >
            ›
          </NavBtn>
        </Footer>
      </Modal>
    </Overlay>
  );
}
