// src/utils/workHours.js

export const LOCATIONS = {
  Kannelmäki: {
    label: "Kannelmäki",
    address: "Klaneettitie 6a, 2 krs, Helsinki",
  },
  Malminkartano: { label: "Malminkartano", address: "Kehruutie 4, Helsinki" },
};

export const getLocationLabel = (id) =>
  LOCATIONS[id]?.label || String(id || "");

export const getLocationAddress = (id) => LOCATIONS[id]?.address || "";

export const formatLocationLabel = (id) => {
  const loc = LOCATIONS[id];
  return loc ? `${loc.label} - ${loc.address}` : String(id || "");
};

export const WORK_HOURS = {
  Kannelmäki: {
    Mon: { start: "10:00", end: "16:00", stepMin: 30 },
    Tue: { start: "16:30", end: "20:30", stepMin: 30 },
    Wed: { start: "10:00", end: "16:00", stepMin: 30 },
    Thu: { start: "16:30", end: "20:30", stepMin: 30 },
    Fri: { start: "10:00", end: "16:00", stepMin: 30 },
    Sat: { start: "11:00", end: "15:00", stepMin: 30 },
  },
  Malminkartano: {
    Mon: { start: "16:30", end: "20:30", stepMin: 30 },
    Tue: { start: "10:00", end: "16:00", stepMin: 30 },
    Wed: { start: "16:30", end: "20:30", stepMin: 30 },
    Thu: { start: "10:00", end: "16:00", stepMin: 30 },
    Fri: { start: "16:30", end: "20:30", stepMin: 30 },
  },
};
export function getWorkHours(locationId, dateStr) {
  const cfg = WORK_HOURS[locationId];
  if (!cfg) return null;
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
  return cfg[day] || null;
}
