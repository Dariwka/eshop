import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";
import { mobile } from "../../responsive";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 960px;
  margin: 0 auto;

  ${mobile({ padding: "20px 10px" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderCard = styled.div`
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 16px 20px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`;

const OrderHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
`;

const OrderMeta = styled.div`
  font-size: 14px;
  color: #4b5563;
`;
const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: ${({ status }) =>
    status === "paid" || status === "succeeded"
      ? "rgba(16, 185, 129, 0.12)"
      : "rgba(251, 191, 36, 0.12)"};
  color: ${({ status }) =>
    status === "paid" || status === "succeeded" ? "#047857" : "#92400e"};
`;
const Total = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const ItemsList = styled.div`
  margin-top: 10px;
  border-top: 1px solid #e5e7eb;
  padding-top: 10px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 4px 0;
  color: #374151;
`;

const ItemTitle = styled.span`
  font-weight: 500;
`;

const Badge = styled.span`
  margin-left: 8px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
`;

const ErrorBox = styled.div`
  padding: 12px 14px;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 14px;
  margin-bottom: 16px;
`;

const LoginLink = styled(Link)`
  color: #2563eb;
  text-decoration: underline;
`;

// вспомогательный расчёт суммы заказа//

const calcOrderTotal = (order) => {
  if (typeof order?.total === "number") return order.total;
  if (Array.isArray(order?.products)) {
    return order.products.reduce((sum, p) => {
      const price = Number(p?.price || 0);
      const qty = Number(p?.quantity || 1);
      return sum + price * qty;
    }, 0);
  }
  return null;
};

const OrdersPage = () => {
  const currentUser = getCurrentUser();
  const token = currentUser?.jwt || currentUser?.token || null;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiBase = useMemo(
    () => process.env.REACT_APP_API_URL || "http://localhost:1337",
    []
  );
  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("NOT_AUTH");
      return;
    }
    const controller = new AbortController();
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${apiBase}/orders/my`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Virhe ladattaessa tilaustietoja (${res.status})`);
        }
        const data = await res.json(); // т.к. в кастомном контроллере мы возвращаем массив, а не { data: [...] }//
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError(
          "Tilausten lataaminen epäonnistui. Yritä hetken päästä uudelleen."
        );
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
    return () => controller.abort();
  }, [token, apiBase]);
  if (!currentUser) {
    return (
      <Container>
        <Title>Omat tilaukset</Title>
        <InfoText>
          Sinun täytyy olla kirjautuneena nähdäksesi omat tilaukset.
          <LoginLink to="/login">Kirjaudu sisään</LoginLink>.
        </InfoText>
      </Container>
    );
  }
  return (
    <Container>
      <Title>Omat tilaukset</Title>
      {error && error !== "NOT_AUTH" && <ErrorBox>{error}</ErrorBox>}
      {loading ? (
        <InfoText>Ladataan tilauksia...</InfoText>
      ) : orders.length === 0 ? (
        <InfoText>
          Sinulla ei ole vielä tilauksia. Voit tehdä tilauksen verkkokaupassa.
        </InfoText>
      ) : (
        <OrdersWrapper>
          {orders.map((order) => {
            const isVoucher = order.isVoucherOnly;
            const created =
              order.createdAt &&
              new Date(order.createdAt).toLocaleString("fi-FI", {
                dateStyle: "short",
                timeStyle: "short",
              });
            const total = calcOrderTotal(order);
            const currency = order.currency || "€";
            return (
              <OrderCard key={order.id || order.stripeId}>
                <OrderHeader>
                  <OrderMeta>
                    <div>
                      <strong>Tilaus #{order.id}</strong>
                      {isVoucher && <Badge>Lahjakortti</Badge>}
                    </div>
                    {created && <div>Päivämäärä: {created}</div>}
                    {order.stripeId && <div>Stripe ID: {order.stripeId}</div>} 
                  </OrderMeta>
                  <div style={{ textAlign: "right" }}>
                    <StatusBadge status={order.status}>
                      {order.status === "paid" || order.status === "succeeded"
                        ? "Maksettu"
                        : order.status === "pending"
                        ? "Odottaa maksua"
                        : order.status || "Tuntematon"}
                    </StatusBadge>
                    <Total>
                      {total != null ? `${total.toFixed(2)} ${currency}` : ""}
                    </Total>
                  </div>
                </OrderHeader>

                {Array.isArray(order.products) && order.products.length > 0 && (
                  <ItemsList>
                    {order.products.map((item, idx) => (
                      <ItemRow key={idx}>
                        <ItemTitle>
                          {item.title || item.name || "Tuote"}
                          {item.type === "voucher" && <Badge>Voucher</Badge>}
                        </ItemTitle>
                        <span>
                          x{item.quantity || 1} —{" "}
                          {item.price != null
                            ? `${Number(item.price).toFixed(2)} ${currency}`
                            : ""}
                        </span>
                      </ItemRow>
                    ))}
                  </ItemsList>
                )}
              </OrderCard>
            );
          })}
        </OrdersWrapper>
      )}
    </Container>
  );
};
export default OrdersPage;
