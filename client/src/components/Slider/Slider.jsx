import React, { useEffect, useRef, useState, useMemo } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import styled from "styled-components";
import { sliderPhotos } from "../../data";

/* ===== Cloudinary helpers (безопасны — ничего не ломают данных) ===== */

function clTransform(url, t) {
  if (!url) return url;
  const i = url.indexOf("/upload/");
  if (i === -1) return url; // не cloudinary
  //
  const head = url.slice(0, i + 8); // включая "/upload/"
  //
  const tail = url.slice(i + 8); // не дублируем, если уже добавлено
  //
  if (tail.startsWith("f_auto") || tail.startsWith("q_auto")) return url;
  return `${head}${t}/${tail}`;
}
function clUrl(url, { w = 1600, h, fit = "cover" } = {}) {
  const fitMap = fit === "contain" ? "c_pad" : "c_fill";
  const base = `f_auto,q_auto:eco,dpr_auto,${fitMap},g_auto,w_${w}${
    h ? `,h_${h}` : ""
  }`;
  return clTransform(url, base);
}
function srcSet(url, widths, { h, fit = "cover" } = {}) {
  return widths.map((w) => `${clUrl(url, { w, h, fit })} ${w}w`).join(", ");
}
/* ======================= styles ======================= */
const SliderRoot = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
`;
const Track = styled.div`
  height: 100%;
  display: flex;
  will-change: transform;
  transition: transform 600ms ease;
`;
const Slide = styled.div`
  position: relative;
  flex: 0 0 100vw;
  height: 100%;
`;
/*const Img = styled.img.attrs(({ $eager }) => ({
  fetchpriority: $eager ? "high" : "low",
  loading: $eager ? "eager" : "lazy",
  decoding: "async",
}))`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; 
`;*/
const Icons = styled.div`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  width: max-content;
  display: flex;
  gap: 10px;
  z-index: 2;
`;
const Icon = styled.button`
  width: 50px;
  height: 50px;
  appearance: none;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.78);
  display: grid;
  place-items: center;
  cursor: pointer;
  border-radius: 6px;
  transition: transform 120ms ease;
  &:hover {
    transform: scale(1.03);
  }
`;
/* ======================= component ======================= */
const Slider = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const slides = useMemo(() => sliderPhotos ?? [], []);
  const len = slides.length; // безопасный авто-скролл
  //
  useEffect(() => {
    if (len <= 1) return;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((v) => (v === len - 1 ? 0 : v + 1));
    }, 3500); // чуть длиннее — картинка успевает прогрузиться
    //
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [current, len]);
  const prev = () => {
    timerRef.current && clearTimeout(timerRef.current);
    setCurrent((v) => (v === 0 ? len - 1 : v - 1)); // фикс off-by-one
    //
  };
  const next = () => {
    timerRef.current && clearTimeout(timerRef.current);
    setCurrent((v) => (v === len - 1 ? 0 : v + 1));
  };
  if (len === 0) return null; // ширины под srcset (ретина + большие мониторы)
  //
  const widths = [800, 1200, 1600, 2000];
  return (
    <SliderRoot aria-roledescription="carousel">
      <Track
        style={{
          width: `${len * 100}vw`,
          transform: `translateX(-${current * 100}vw)`,
        }}
      >
        {slides.map((s, i) => {
          const eager = i === 0; // первый слайд грузим сразу
          //
          const url = s.img;
          return (
            <Slide key={s.id ?? i}>
              <img
                src={clUrl(url, { w: 1200 })} // базовая
                //
                srcSet={srcSet(url, widths)} // вариативная
                //
                sizes="100vw" // всегда во всю ширину
                //
                alt=""
                fetchpriority={eager ? "high" : "low"}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                style={{
                  width: "100vw",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Slide>
          );
        })}
      </Track>
      {len > 1 && (
        <Icons>
          <Icon aria-label="Previous" onClick={prev}>
            <ArrowBackIosNewOutlinedIcon />
          </Icon>
          <Icon aria-label="Next" onClick={next}>
            <ArrowForwardIosOutlinedIcon />
          </Icon>
        </Icons>
      )}
    </SliderRoot>
  );
};
export default Slider;
