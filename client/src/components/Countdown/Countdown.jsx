import { useEffect, useState } from "react";

export default function Countdown({ to }) {
  const target = new Date(to).getTime();
  const [left, setLeft] = useState(Math.max(0, target - Date.now()));

  useEffect(() => {
    const id = setInterval(
      () => setLeft(Math.max(0, target - Date.now())),
      1000
    );
    return () => clearInterval(id);
  }, [target]);

  const s = Math.floor(left / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  if (left <= 0) return <span>Offer ended</span>;
  return (
    <span>
      {d}d:{h.toString().padStart(2, "0")}h:
      {m.toString().padStart(2, "0")}m:
      {sec.toString().padStart(2, "0")}s
    </span>
  );
}
