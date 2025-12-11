import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
`;
const Toast = styled.div`
  min-width: 260px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #16a34a; /* зелёный */
  color: #ffffff;
  font-size: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Check = styled.span`
  font-size: 18px;
`;

export default function LoginSuccessToast() {
  const location = useLocation();
  const [visible, setVisible] = useState(false); // ловим флаг из navigate(..., { state: { loginSuccess: true } })
  //
  useEffect(() => {
    if (location.state?.loginSuccess) {
      setVisible(true); // убираем loginSuccess из history, чтобы тост не появлялся при F5
      //
      window.history.replaceState(
        {},
        document.title,
        location.pathname + location.search
      );
    }
  }, [location]); // автоскрытие через 4 секунды
  //
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [visible]);
  if (!visible) return null;
  return (
    <ToastWrapper>
      <Toast>
        <Check>✅</Check>
        <span>Kirjautuminen onnistui.</span>   
      </Toast>
    </ToastWrapper>
  );
}
