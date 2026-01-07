import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { mobile } from "../../responsive";
import { VARIANTS } from "../PromoVariants/PromoVariants";

// ================= helpers =================
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
    "promoVariant", // 👈 тянем тему из Strapi
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

// ================ styles =================
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
  position: relative;
  width: min(560px, 92vw);
  background: ${(p) => p.$bg || "#ffffff"};
  color: ${(p) => p.$fg || "#242e3e"};
  border-radius: 20px;
  box-shadow: 0 20px 60px ${(p) => p.$shadow || "rgba(0,0,0,.25)"};
  animation: ${appear} 0.18s ease-out both;
  overflow: hidden;
  ${mobile({ width: "min(520px, 94vw)", borderRadius: "16px" })}
`;
const DecoImg = styled.img`
  position: absolute;
  width: ${(p) => (p.$size ? `${p.$size}px` : "100px")};
  height: auto;
  opacity: ${(p) => p.$opacity ?? 1};
  transform: rotate(${(p) => p.$rotate ?? 0}deg);
  pointer-events: none;
  ${(p) => (p.$top !== undefined ? `top:${p.$top}px;` : "")}
  ${(p) => (p.$left !== undefined ? `left:${p.$left}px;` : "")}
  ${(p) => (p.$right !== undefined ? `right:${p.$right}px;` : "")}
  ${(p) => (p.$bottom !== undefined ? `bottom:${p.$bottom}px;` : "")}
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
  background: ${(p) => p.$bg || "red"};
  color: ${(p) => p.$fg || "white"};
  border-radius: 999px;
  font-weight: 800;
  font-size: 14px;
  padding: 6px 12px;
  letter-spacing: 0.2px;
`;
const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: ${(p) => p.$color || "#242e3e"};
  text-shadow: ${(p) => p.$shadow || "none"};
  ${(p) =>
    p.$urgent &&
    css`
      animation: ${pulse} 1.2s ease-in-out infinite;
    `}
  ${mobile({ fontSize: "16px" })}
`;

const TitleBar = styled.div`
  padding: 6px 10px;
  border-radius: 10px;
  background: ${(p) => p.$bg || "transparent"}; /* полупрозрачный фон */
  backdrop-filter: blur(2px);
`;

const Close = styled.button`
  appearance: none;
  position: absolute;
  top: 10px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #111827;
  font-size: 18px;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 1;
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.06s ease;
  &:hover {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
  &:active {
    transform: scale(0.96);
  }
  &:focus-visible {
    outline: 2px solid #2563eb;
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
  color: rgba(
    255,
    255,
    255,
    0.9
  ); /* было #6b7280 — на тёмной теме плохо видно */
  margin-top: 10px;
`;

const PriceRow = styled.div`
  text-align: center;
  margin: 6px 0 2px;
  b {
    font-size: 28px;
    color: ${(p) => p.$price || "#065f46"};
    text-shadow: ${(p) => p.$glow || "none"};
  }
  s {
    color: rgba(255, 255, 255, 0.6); /* лучше читается на тёмном фоне */
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
  color: ${(p) => p.$color || "#065f46"};
  ${(p) =>
    p.$urgent &&
    css`
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
  background: rgba(255, 255, 255, 0.08);
  color: ${(p) => p.$fg || "#fff"};
  font-weight: 900;
  font-size: 18px;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
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
  background: ${(p) => p.$bg || "#166534"};
  color: ${(p) => p.$fg || "#fff"};
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  &:hover {
    filter: brightness(1.05);
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
  const autoRef = useRef(null);

  // fetch
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = `${API_URL}${buildQuery()}`;
        const r = await fetch(url, { credentials: "include" });
        const ct = r.headers.get("content-type") || "";
        if (!ct.includes("application/json")) return;
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
      } catch (e) {
        // молчим в проде
        // console.error("[PromoSquareModal] fetch error:", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev || "auto");
  }, [open]);

  // секундный тик
  useEffect(() => {
    if (!open) return;
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [open]);

  // прелоад соседних картинок + автокарусель
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
    // warm next & prev
    if (items.length > 0) {
      const warm = (index) => {
        const x = items[index];
        if (!x?.imgUrl) return;
        const im = new Image();
        im.src = x.imgUrl;
      };
      warm((idx + 1) % items.length);
      warm((idx - 1 + items.length) % items.length);
    }
    startAuto();
    return () => stopAuto();
  }, [open, idx, items, startAuto, stopAuto]);

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
    },
    [navigate, closeModal]
  );

  if (!open || items.length === 0) return null;

  const it = items[idx];
  const priceNow = activePrice(it);
  const variantKey = String(it.promoVariant || "default")
    .toLowerCase()
    .trim();
  const theme = VARIANTS[variantKey] || VARIANTS.default;

  const old = Number(it.price || 0);
  const discount = old > 0 ? Math.round((1 - priceNow / old) * 100) : null;
  const endsMs = it?.promoEndsAt ? new Date(it.promoEndsAt).getTime() - now : 0;
  const { dd, hh, mm, ss } = toDDHHMMSS(endsMs);
  const urgent = endsMs > 0 && endsMs < 3 * 60 * 60 * 1000; // < 3 часа

  return (
    <Overlay role="dialog" aria-modal="true">
      <Modal
        $bg={theme.bg}
        $fg={theme.fg}
        $shadow={theme.shadow}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        {/* Декоративные наложения (веточки/сердечки/проценты) */}
        {Array.isArray(theme.overlay) &&
          theme.overlay.map((o, i) => (
            <DecoImg
              key={i}
              src={o.src}
              alt=""
              aria-hidden="true"
              $size={o.size}
              $top={o.top}
              $left={o.left}
              $right={o.right}
              $bottom={o.bottom}
              $opacity={o.opacity}
              $rotate={o.rotate}
            />
          ))}

        <Head>
          <Badge $bg={theme.badgeBg} $fg={theme.badgeFg}>
            {theme.badgeText || "TARJOUS!"}
          </Badge>
          <TitleBar $bg={theme.titleBg}>
            {" "}
            <Title
              $color={theme.fg}
              $shadow={theme.titleShadow}
              $urgent={urgent}
            >
              {theme.name === "blackfriday"
                ? `BLACK FRIDAY — tarjous päättyy pian${
                    discount !== null ? ` (${discount}%)` : ""
                  }`
                : theme.name === "christmas"
                ? `Joulutarjous — tarjous päättyy pian${
                    discount !== null ? ` (${discount}%)` : ""
                  }`
                : theme.name === "valentines"
                ? `Ystävänpäivä — tarjous päättyy pian${
                    discount !== null ? ` (${discount}%)` : ""
                  }`
                : `Pidä kiirettä — tarjous päättyy pian${
                    discount !== null ? ` (${discount}%)` : ""
                  }`}
            </Title>
          </TitleBar>
          <Close aria-label="Sulje" onClick={closeModal}>
            ×
          </Close>
        </Head>

        <Body>
          <Pic
            key={it.imgUrl}
            src={it.imgUrl}
            alt={it.title}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <Caption>{it.title}</Caption>

          <PriceRow $price={theme.price} $glow={theme.priceGlow}>
            <b>€{Number(priceNow).toFixed(0)}</b>
            {old > priceNow ? <s>€{Number(old).toFixed(0)}</s> : null}
          </PriceRow>

          <TimerRow
            $color={theme.price}
            $urgent={urgent}
            aria-label="Tarjouksen loppumiseen"
          >
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
            $fg={theme.fg}
            type="button"
            onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
            disabled={items.length <= 1}
            aria-label="Edellinen"
          >
            ‹
          </NavBtn>

          <Cta
            $bg={theme.ctaBg}
            $fg={theme.ctaFg}
            type="button"
            onClick={() => goTo(it.slug)}
            aria-label="Katso"
          >
            Katso
          </Cta>

          <NavBtn
            $fg={theme.fg}
            type="button"
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
