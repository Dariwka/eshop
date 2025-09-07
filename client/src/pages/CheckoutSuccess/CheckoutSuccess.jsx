import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const CheckoutSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const sessionId = params.get("session_id");
  const slug = params.get("slug"); // важно: передаём это из success_url
  useEffect(() => {
    // если пришёл slug — сразу ведём на страницу процедуры
    if (slug) {
      // добавляем флаг, чтобы Treatment.jsx автоматически открыл BookingForm
      navigate(`/treatment/${encodeURIComponent(slug)}?openBooking=1`, {
        replace: true,
      });
    }
  }, [slug, navigate]); // Фолбек: если slug не пришёл (например, старый success_url)
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Payment successful </h1>
      {sessionId && (
        <p style={{ color: "#666" }}>
          Session: <code>{sessionId}</code>
        </p>
      )}
      {!slug && (
        <>
          <p style={{ marginTop: 16 }}>
            Thank you for your purchase. You can proceed to choose your time.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link
              to="/treatments"
              style={{
                display: "inline-block",
                padding: "12px 16px",
                background: "var(--brand, #2e7d32)",
                color: "#fff",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Go to treatments →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default CheckoutSuccess;
