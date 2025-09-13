import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337";

const spin = keyframes`to { transform: rotate(360deg); }`;

const Page = styled.div`
  min-height: 60vh;
  padding: 32px;
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  place-items: center;
  text-align: center;
`;
const Box = styled.div``;
const Title = styled.h1`
  margin-bottom: 8px;
`;
const DevNote = styled.p`
  color: #999;
  margin-top: 8px;
  font-size: 12px;
`;
const Spinner = styled.div`
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 3px solid rgba(0, 0, 0, 0.15);
  border-top-color: var(--brand, #2e7d32);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
const Step = styled.p`
  margin-top: 14px;
  font-size: 1.05rem;
  font-weight: 600;
`;
const Text = styled.p`
  margin-top: 8px;
  font-size: 1.05rem;
  line-height: 1.5;
`;
const Hint = styled.p`
  margin-top: 16px;
  color: #666;
  margin-bottom: 10px;
`;
const Btn = styled.button`
  display: inline-block;
  padding: 12px 16px;
  background: var(--brand, #2e7d32);
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  border: 0;
  cursor: pointer;
`;
const ErrorText = styled.p`
  margin-top: 8px;
  color: crimson;
`;
const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const sessionId = params.get("session_id");
  const slug = params.get("slug");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (status !== "processing") return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [status]);
  useEffect(() => {
    if (!sessionId) return;
    setStatus("processing");
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/orders/success?session_id=${encodeURIComponent(
            sessionId
          )}`,
          { method: "GET" }
        );
        const json = await res.json();
        if (!res.ok) {
          setStatus("error");
          setMessage(json?.error?.message || "Server error");
          return;
        }
        setStatus("done");
        const kind = json?.data?.kind ?? json?.kind;
        if (slug && kind === "voucher_order") {
          navigate(
            `/treatment/${encodeURIComponent(
              slug
            )}?openBooking=1&voucher=1&success=1`,
            { replace: true }
          );
        }
      } catch (e) {
        setStatus("error");
        setMessage("Network error");
      }
    })();
  }, [sessionId, slug, navigate]);
  const fallbackGo = () => {
    if (slug) {
      navigate(
        `/treatment/${encodeURIComponent(
          slug
        )}?openBooking=1&voucher=1&success=1`,
        { replace: true }
      );
    } else {
      navigate("/treatments", { replace: true });
    }
  };
  return (
    <Page>
      <Box>
        <Title>Maksu onnistui</Title>
        {process.env.NODE_ENV === "development" && sessionId && (
          <DevNote>
            (dev) session: <code>{sessionId}</code>
          </DevNote>
        )}
        {status === "processing" && (
          <>
            <Spinner /> <Step>Vaihe {elapsed < 3 ? "1/2" : "2/2"}</Step>
            <Text>
              {elapsed < 3
                ? "Viimeistelemme maksua ja luomme voucherin…"
                : "Älä sulje tätä sivua — avaamme pian varauslomakkeen ja lähetämme vahvistuksen sähköpostitse."}
            </Text>
            {elapsed >= 10 && (
              <>
                <Hint>
                  Jos varaussivu ei avaudu automaattisesti, klikkaa tästä:
                </Hint>
                <Btn onClick={fallbackGo}>Avaa varauslomake</Btn>
              </>
            )}
          </>
        )}
        {status === "error" && (
          <>
            <ErrorText>Jokin meni pieleen: {message}</ErrorText>
            <div style={{ marginTop: 18 }}>
              <a href="/treatments">
                <Btn>Takaisin hoitoihin →</Btn>
              </a>
            </div>
          </>
        )}
        {status === "done" && !slug && (
          <>
            <Text>Maksu käsitelty. Voit siirtyä hoitoihin.</Text>
            <a href="/treatments">
              <Btn>Siirry hoitoihin →</Btn>
            </a>
          </>
        )}
      </Box>
    </Page>
  );
};
export default CheckoutSuccess;
