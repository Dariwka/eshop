import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- стили для зелёной пилюли --- //
const ToastBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  min-width: 260px;
  max-width: 480px;
  padding: 10px 28px;

  background: #16a34a; /* фирменный зелёный */
  color: #ffffff;
  border-radius: 999px;

  font-size: 14px;
  font-weight: 600;

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
`;

const CheckIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid #ffffff;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 7px;
    height: 4px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(-45deg) translateY(-1px);
  }
`;

const Message = styled.span`
  white-space: nowrap;
`;

// сам контент тоста
//
const KosmedikToast = ({ message }) => (
  <ToastBox>
    <CheckIcon />
    <Message>{message}</Message>
  </ToastBox>
);

// общие настройки для всех наших уведомлений
//
const commonOptions = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  icon: false,
};

// --- публичные функции --- //
export const notifyLoginSuccess = () =>
  toast(<KosmedikToast message="Kirjautuminen onnistui!" />, commonOptions);

export const notifyResetLink = () =>
  toast(
    <KosmedikToast message="Salasanan palautuslinkki lähetetty (jos sähköposti löytyy järjestelmästä)." />,
    commonOptions
  );

export const notifyResetLinkSent = () =>
  toast(<KosmedikToast message="Linkki lähetetty!" />, commonOptions);

export const notifyPasswordChanged = () =>
  toast(
    <KosmedikToast message="Salasana vaihdettu onnistuneesti." />,
    commonOptions
  );

export const notifyLogout = () =>
  toast(<KosmedikToast message="Uloskirjautuminen onnistui." />, commonOptions);

export const notifyRegisterSuccess = () =>
  toast(<KosmedikToast message="Tili luotu onnistuneesti." />, commonOptions);

// контейнер, который рендерим один раз в App.jsx//

export const KosmedikToastContainer = () => (
  <ToastContainer newestOnTop limit={3} closeButton={false} pauseOnFocusLoss />
);
