// src/utils/time.js

// "10:30" -> минут от начала дня
export const hhmmToMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// 630 -> "10:30"
export const minToHHMM = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

// добавление минут к строке "HH:MM"
export const addMinutes = (hhmm, mins) => minToHHMM(hhmmToMin(hhmm) + mins);

// YYYY-MM-DD
export const toISODate = (d = new Date()) => d.toISOString().slice(0, 10);

// true, если дата в прошлом (относительно локального времени)
export const isPastDate = (yyyy_mm_dd) => {
  const today = toISODate();
  return yyyy_mm_dd < today;
};

// собрать Date из "YYYY-MM-DD" + "HH:MM" (локально)
export const combineDateTime = (dateStr, timeStr) => {
  const [y, M, d] = dateStr.split("-").map(Number);
  const [h, m] = timeStr.split(":").map(Number);
  return new Date(y, M - 1, d, h, m, 0, 0);
};

// пересекаются ли интервалы [aFrom, aTo) и [bFrom, bTo) в минутах
export const isOverlap = (aFrom, aTo, bFrom, bTo) =>
  Math.max(aFrom, bFrom) < Math.min(aTo, bTo);
