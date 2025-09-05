// src/utils/slots.js
import { hhmmToMin, minToHHMM } from "./time";

/** * Генерирует сетку стартов по stepMin в пределах [start, end]. * Каждый элемент — это объект { from, to }, где to = from + stepMin. */ export function generateSlots({
  start,
  end,
  stepMin,
}) {
  const res = [];
  let cur = hhmmToMin(start);
  const endMin = hhmmToMin(end);
  if (endMin <= cur || stepMin <= 0) return res;
  while (cur + stepMin <= endMin) {
    res.push({ from: minToHHMM(cur), to: minToHHMM(cur + stepMin) });
    cur += stepMin;
  }
  return res;
}
/** * Удаляет слоты, которые:
 * - не помещаются целиком в рабочее время (start + duration > dayEnd) * - пересекаются с любым busy-интервалом
 * @param {Array<{from:string,to:string}>} slots - сетка стартов
 * @param {Array<{start:string,end:string}>} busyList - занятые интервалы 'HH:mm'
 * @param {number} durationMin - длительность процедуры в минутах
 * @param {string} dayEndHHMM - конец рабочего дня 'HH:mm'
 * @returns {Array<{from:string,to:string}>} */

export function subtractBusy(slots, busyList, durationMin, dayEndHHMM) {
  if (!slots?.length) return [];
  const busy = (busyList || []).map((b) => ({
    from: hhmmToMin(b.start),
    to: hhmmToMin(b.end),
  }));
  const dayEndMin = hhmmToMin(dayEndHHMM);
  return slots
    .filter((s) => {
      const startMin = hhmmToMin(s.from);
      const finishMin = startMin + durationMin; // слот должен полностью поместиться в рабочие часы
      if (finishMin > dayEndMin) return false; // не должен пересекаться с занятыми интервалами
      const overlaps = busy.some(
        (b) => Math.max(startMin, b.from) < Math.min(finishMin, b.to)
      );
      return !overlaps;
    }) // отображаем конец как конец процедуры (не шаг сетки)
    .map((s) => {
      const startMin = hhmmToMin(s.from);
      return { from: s.from, to: minToHHMM(startMin + durationMin) };
    });
}
