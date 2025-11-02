export const VARIANTS = {
  // === БАЗА ===
  default: {
    name: "default",
    badgeText: "TARJOUS!",
    bg: `
    radial-gradient(800px 420px at 50% -10%, rgba(0,0,0,.03), transparent 60%),
    repeating-linear-gradient(135deg, rgba(0,0,0,.04) 0 8px, rgba(0,0,0,0) 8px 16px),
    #ffffff
  `,
    fg: "#111111",
    price: "#16a34a", // зелёная цена
    ctaBg: "#166534", // зелёная кнопка
    ctaFg: "#ffffff",
    badgeBg: "#166534", // зелёный бейдж (как было)
    badgeFg: "#ffffff",
    titleBg: "rgba(255,255,255,.7)",
    titleShadow: "0 1px 2px rgba(0,0,0,.15)",
    shadow: "rgba(0,0,0,.12)",
    priceGlow: "0 0 10px rgba(22,163,74,.25)",
    overlay: [], // без украшений — чистый стиль
  },

  // === BLACK FRIDAY ===
  blackfriday: {
    name: "blackfriday",
    badgeText: "BLACK TARJOUS",
    // посветлее фон и мягкие полосы
    bg: `
      radial-gradient(900px 500px at 50% -10%, rgba(255,255,255,.08), transparent 60%),
      repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 8px, rgba(0,0,0,.04) 8px 16px),
      linear-gradient(135deg,#0b0b0b,#1a1a1a)
    `,
    fg: "#f7faf9",
    price: "#1ef08a",
    ctaBg: "#1ef08a",
    ctaFg: "#0a0d0a",
    badgeBg: "#0b0b0b",
    badgeFg: "#1ef08a",
    titleBg: "rgba(0,0,0,.55)", // 👈 полупрозрачная подложка под заголовком
    shadow: "rgba(0,0,0,.55)",
    priceGlow: "0 0 18px rgba(30,240,138,.55)",
    titleShadow: "0 2px 18px rgba(0,0,0,.45)",
    overlay: [
      // проценты по углам — слабые
      {
        src:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
              <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                font-family='Arial Black, Arial, sans-serif' font-size='72' fill='rgba(255,255,255,.07)'>%</text>
            </svg>`
          ),
        size: 120,
        top: -10,
        left: -8,
        opacity: 1,
        rotate: -12,
      },
      {
        src:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
              <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                font-family='Arial Black, Arial, sans-serif' font-size='72' fill='rgba(255,255,255,.07)'>%</text>
            </svg>`
          ),
        size: 120,
        bottom: -10,
        right: -8,
        opacity: 1,
        rotate: 10,
      },
    ],
  },

  // === CHRISTMAS ===
  christmas: {
    name: "christmas",
    badgeText: "CHRISTMAS TARJOUS",
    bg: "linear-gradient(135deg,#103a24,#184e2f)",
    fg: "#ffffff",
    price: "#fef08a",
    ctaBg: "#e11d48",
    ctaFg: "#ffffff",
    badgeBg: "#0e3a23",
    badgeFg: "#ffffff",
    titleBg: "rgba(14,58,35,.55)", // лучше читается заголовок
    titleShadow: "0 2px 18px rgba(0,0,0,.45)",
    shadow: "rgba(0,30,20,.32)",
    overlay: [
      // еловая веточка слева
      {
        src:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'>
              <path d='M10 50 C 40 10, 90 8, 140 42' stroke='#2e7d32' stroke-width='11' fill='none' stroke-linecap='round'/>
              <path d='M18 64 C 48 24, 100 22, 150 48' stroke='#43a047' stroke-width='9' fill='none' stroke-linecap='round'/>
              <circle cx='44' cy='36' r='7' fill='#e11d48'/>
              <circle cx='96' cy='26' r='6' fill='#f59e0b'/>
            </svg>`
          ),
        size: 170,
        top: -14,
        left: -12,
        opacity: 0.95,
        rotate: 0,
      },
      // снежинки справа
      {
        src:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
              <g fill='none' stroke='rgba(255,255,255,.55)' stroke-width='2'>
                <path d='M80 8 L80 152 M8 80 L152 80 M24 24 L136 136 M136 24 L24 136'/>
              </g>
              <circle cx='120' cy='30' r='3' fill='rgba(255,255,255,.7)'/>
              <circle cx='140' cy='52' r='2' fill='rgba(255,255,255,.6)'/>
            </svg>`
          ),
        size: 130,
        bottom: -8,
        right: -8,
        opacity: 1,
        rotate: 0,
      },
    ],
  },

  // === VALENTINE'S ===
  valentines: {
    name: "valentines",
    badgeText: "VALENTINE TARJOUS",
    bg: "linear-gradient(135deg,#8b1c31,#c02634)",
    fg: "#fff5f7",
    price: "#ffe4e6",
    ctaBg: "#ffd1dc",
    ctaFg: "#5b0f1a",
    badgeBg: "#6b1222",
    badgeFg: "#fff5f7",
    shadow: "rgba(90,10,30,.28)",
    overlay: [
      // Сердечки по углам
      {
        src:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
              <path d='M60,104 C20,74 4,54 16,36 C26,22 44,24 60,36 C76,24 94,22 104,36 C116,54 100,74 60,104 Z'
                fill='rgba(255,255,255,.15)'/>
            </svg>`
          ),
        size: 120,
        top: -12,
        right: -8,
        opacity: 1,
        rotate: 0,
      },
      {
        src:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
              <path d='M60,104 C20,74 4,54 16,36 C26,22 44,24 60,36 C76,24 94,22 104,36 C116,54 100,74 60,104 Z'
                fill='rgba(255,255,255,.12)'/>
            </svg>`
          ),
        size: 110,
        bottom: -10,
        left: -10,
        opacity: 1,
        rotate: 0,
      },
    ],
  },

  // при желании — newyear, easter и т. п.
};
