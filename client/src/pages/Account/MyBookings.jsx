import React from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import { toISODate } from "../../utils/time";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 32px auto;
  padding: 0 16px;
`;
const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 16px;
`;
const Table = styled.div`
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
`;
const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 120px 90px 1fr 140px 130px;
  padding: 8px 12px;
  background: var(--soft);
  font-weight: 600;
  font-size: 14px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 120px 90px 1fr 140px 130px;
  padding: 8px 12px;
  font-size: 14px;
  border-top: 1px solid var(--border);
`;
const Cell = styled.div``;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  ${({ status }) => {
    if (status === "confirmed") return "background:#e9fce5;color:#166534;";
    if (status === "pending" || status === "hold")
      return "background:#fef9c3;color:#92400e;";
    if (status === "declined") return "background:#fee2e2;color:#991b1b;";
    return "";
  }}
`;
const Empty = styled.p`
  font-size: 14px;
  color: var(--muted);
`;

const MyBookingsContent = ({ user }) => {
  const today = toISODate();

  const { data, loading, error } = useFetch(
    `/bookings?filters[user][id][$eq]=${user.id}` +
      `&filters[date][$gte]=${today}` +
      `&populate[treatment][fields][0]=title` +
      `&sort[0]=date:asc&sort[1]=start:asc`
  );

  if (loading) {
    return (
      <Wrapper>
        <Title>Omat varaukset</Title>
        <Empty>Ladataan varauksia...</Empty>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Title>Omat varaukset</Title>
        <Empty>Varauksia ei voitu ladata.</Empty>
      </Wrapper>
    );
  }

  const bookings = data || [];

  if (!bookings.length) {
    return (
      <Wrapper>
        <Title>Omat varaukset</Title>
        <Empty>Sinulla ei ole tulevia varauksia.</Empty>
      </Wrapper>
    );
  }
  return (
    <Table>
      <HeaderRow>
        <Cell>Päivä</Cell>
        <Cell>Aika</Cell>
        <Cell>Hoito</Cell>
        <Cell>Sijainti</Cell>
        <Cell>Tila</Cell>
      </HeaderRow>

      {bookings.map((b) => {
        const at = b.attributes || b;
        const date = at.date;
        const time = at.start?.slice(0, 5) || "";
        const treatmentTitle = at.treatment?.data?.attributes?.title || "-";
        const location = at.location || "";
        const status = at.status || "pending";
        const fiStatus =
          status === "confirmed"
            ? "Vahvistettu"
            : status === "hold"
            ? "Varaus käsittelyssä"
            : status === "declined"
            ? "Peruttu"
            : "Odottaa";
        return (
          <Row key={b.id}>
            <Cell>{date}</Cell>
            <Cell>{time}</Cell>
            <Cell>{treatmentTitle}</Cell>
            <Cell>{location}</Cell>
            <Cell>
                <StatusBadge status={status}>{fiStatus}</StatusBadge>
            </Cell>
          </Row>
        );
      })}
    </Table>
  );
};

const MyBookings = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Wrapper>
      <Title>Omat varaukset</Title>
      {!user ? (
        <Empty>Kirjaudu sisään nähdäksesi varauksesi.</Empty>
      ) : (
        <MyBookingsContent user={user} />
      )}
    </Wrapper>
  );
};
export default MyBookings;
