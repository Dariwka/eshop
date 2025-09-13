import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartReducer";

const Container = styled.div`
  max-width: 720px;
  margin: 56px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Title = styled.h2`
  margin: 0 0 12px;
  color: #0e9202;
  font-weight: 800;
`;
const Text = styled.p`
  margin: 0 0 16px;
  color: #374151;
  line-height: 1.5;
`;
const fade = keyframes`from { opacity: .3; transform: scale(.96); }to{ opacity: 1;transform: scale(1); }`;
const SpinnerWrap = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${fade} 300ms ease;
`;
const spin = keyframes`to { transform: rotate(360deg); }`;
const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border: 3px solid #e5e7eb;
  border-top-color: #0e9202;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

function Success() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMsg("Puuttuu session_id. Ota yhteyttä: info@kosmedik.eu");
      return;
    }
    const fetchOrder = async () => {
      try {
        const base = process.env.REACT_APP_API_URL || "http://localhost:1337";
        const res = await fetch(
          `${base}/orders/success?session_id=${encodeURIComponent(sessionId)}`
        );
        const json = await res.json();
        if (!res.ok || json?.error) {
          throw new Error(json?.error?.message || `HTTP ${res.status}`);
        }
        setStatus("done");
        setMsg(
          "Tilauksesi on vastaanotettu. Vahvistus on lähetetty sähköpostiisi."
        );
      } catch (e) {
        setStatus("error");
        setMsg("Jotain meni pieleen. Ota yhteyttä: info@kosmedik.eu");
      }
    };
    fetchOrder();
  }, [sessionId]);
  return (
    <Container>
      {status === "processing" && (
        <>
          <Title>Checkout Successful</Title>
          <Text>Viimeistellään tilausta… Odota hetki, älä sulje sivua.</Text>
          <SpinnerWrap>
            <Spinner /> <Text style={{ margin: 0 }}>Käsitellään maksua</Text>
          </SpinnerWrap>
        </>
      )}

      {status === "done" && (
        <>
          <Title>Checkout Successful</Title> <Text>{msg}</Text>
        </>
      )}

      {status === "error" && (
        <>
          <Title style={{ color: "#b91c1c" }}>Virhe</Title> <Text>{msg}</Text>
        </>
      )}
    </Container>
  );
}
export default Success;
