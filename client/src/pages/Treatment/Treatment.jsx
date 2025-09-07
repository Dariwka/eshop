import React, { useState, useMemo, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookingForm from "../../components/Booking/BookingForm";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { isPromoActive, getActivePrice, getCountdown } from "../../utils/promo";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";

// ===== styles =====
const ContainerTreatment = styled.div`
  padding: 30px 50px;
  display: flex;
  gap: 50px;
  ${mobile({ flexDirection: "column", padding: "20px" })}
`;
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  ${mobile({ gap: "10px" })};
`;
const ImagesContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 10px;
`;
const MainImg = styled.div`
  flex: 5;
  ${mobile({ flex: "3" })};
`;
const ImageBig = styled.img`
  width: 100%;
  max-height: 800px;
  object-fit: cover;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${mobile({ gap: "20px" })};
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: bold;
`;
const Price = styled.span`
  font-size: 30px;
  color: green;
  font-weight: 500;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;
const Desc = styled.p`
  font-size: 18px;
  font-weight: 300;
  text-align: justify;
  ${mobile({ fontSize: "16px" })};
`;
const AddButton = styled.button`
  width: 250px;
  padding: 10px;
  background-color: green;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  ${mobile({ width: "auto" })};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: gray;
  font-size: 14px;
  margin-top: 30px;
`;
const HrBorder = styled.hr`
  border: 1px solid rgb(238, 237, 237);
`;
const Hr = styled.hr`
  width: 200px;
  border: 1px solid rgb(238, 237, 237);
`;

// ===== countdown on the details page =====
function Countdown({ attrs }) {
  const [msLeft, setMsLeft] = useState(getCountdown(attrs));

  useEffect(() => {
    if (msLeft == null) return;
    const id = setInterval(() => {
      setMsLeft((prev) => {
        if (prev == null) return prev;
        const next = prev - 1000;
        return next > 0 ? next : null;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [msLeft]);

  if (msLeft == null) return null;

  const totalSeconds = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return (
    <div style={{ marginTop: 8, fontSize: 14 }}>
      Tarjous voimassa: {days}dd : {hours}hh : {minutes}mm
    </div>
  );
}

// ===== component =====
const Treatment = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [selectedImg, setSelectedImg] = useState("img");
  const [open, setOpen] = useState(false);

  // Грузим только нужные поля
  const url =
    `/treatments?` +
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&fields[0]=title&fields[1]=info&fields[2]=price&fields[3]=duration` +
    `&fields[4]=area&fields[5]=goal&fields[6]=tags&fields[7]=longDesc&fields[8]=additional&fields[9]=contraindication` +
    `&fields[10]=promoEnabled&fields[11]=promoPrice&fields[12]=promoStartsAt&fields[13]=promoEndsAt` +
    `&populate[img][fields][0]=url&populate[img2][fields][0]=url`;

  const { data, loading, error } = useFetch(url);

  // первая (и единственная) запись
  const item = useMemo(() => (Array.isArray(data) ? data[0] : data), [data]);
  const attrs = item?.attributes || {};
  const treatmentId = item?.id;

  const promo = isPromoActive(attrs);
  const priceNow = getActivePrice(attrs);

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    if (sp.get("openBooking") === "1") {
      setOpen(true);
    }
  }, [location.search]);

  const bookingOpenHandler = () => setOpen((v) => !v);

  // 🔑 лучше хранить в .env: REACT_APP_STRIPE_PK=pk_...
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PK ||
      "pk_live_51OrOqrJ4503MJ2aYg5Hlfd9ZwMnoNS1zhVqczEV7YEnthFSvFHxwo3T2qVPqcp8zZdCtfHLOP0LPbm4MlgG9fK1g004TPdwKSr"
  );

  const handleBuy = async () => {
    try {
      if (!treatmentId) {
        alert("No treatment id found");
        return;
      }
      const stripe = await stripePromise;
      const product = {
        id: Number(treatmentId),
        title: attrs?.title || "",
        price: Number(getActivePrice(attrs)),
        quantity: 1,
        img: attrs?.img?.data?.attributes?.url || "",
        type: "voucher",
        slug, // пригодится на стороне success-страницы
      };
      // создаём checkout-сессию на бэке
      const res = await makeRequest.post(
        `/orders?slug=${encodeURIComponent(slug)}`,
        { products: [product] }
      );
      await stripe.redirectToCheckout({
        sessionId: res?.data?.stripeSession?.id,
      });
    } catch (err) {
      console.error("PAY ERROR:", err?.response?.data || err);
      alert(err?.response?.data?.error?.message || "Payment error");
    }
  };

  if (error) return <div>Something went wrong</div>;
  if (loading) return <LoadingButton loading />;
  if (!item) return <div>Not found</div>;

  return (
    <ContainerTreatment>
      <LeftContainer>
        <ImagesContainer>
          <Image
            src={attrs?.img?.data?.attributes?.url}
            alt=""
            onClick={() => setSelectedImg("img")}
          />
          <Image
            src={attrs?.img2?.data?.attributes?.url}
            alt=""
            onClick={() => setSelectedImg("img2")}
          />
        </ImagesContainer>

        <MainImg>
          <ImageBig src={attrs?.[selectedImg]?.data?.attributes?.url} alt="" />
        </MainImg>
      </LeftContainer>

      <Right>
        <Title>{attrs?.title}</Title>

        <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          {promo && (
            <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
              €{Number(attrs?.price).toFixed(0)}
            </span>
          )}
          <Price>€{Number(priceNow).toFixed(0)}</Price>
        </div>

        {promo && <Countdown attrs={attrs} />}

        <Time>
          <AccessTimeOutlinedIcon />
          {attrs?.duration} min
        </Time>

        <Desc>{attrs?.info}</Desc>
        {promo ? (
          <AddButton as="button" onClick={handleBuy}>
            <ShoppingCartIcon />
            Osta
          </AddButton>
        ) : (
          <AddButton onClick={bookingOpenHandler}>
            <CalendarMonthIcon /> Booking a treatment
          </AddButton>
        )}

        <InfoContainer>
          <span>Area: {attrs?.area}</span>
          <span>Goal: {attrs?.goal}</span>
          <span>Tags: {attrs?.tags}</span>
        </InfoContainer>

        <HrBorder />

        <InfoContainer>
          <span>DESCRIPTION: {attrs?.longDesc}</span>
          <Hr />
          <span>ADDITIONAL INFORMATION: {attrs?.additional}</span>
          <Hr />
          <span>CONTRAINDICATIONS: {attrs?.contraindication}</span>
          <Hr />
          <span>FAQ</span>
        </InfoContainer>
      </Right>

      {open && <BookingForm treatment={attrs} close={bookingOpenHandler} />}
    </ContainerTreatment>
  );
};

export default Treatment;
