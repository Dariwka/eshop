import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { combineDateTime } from "../../utils/time";
import { formatLocationLabel } from "../../utils/workHours";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337/api";

// --- helpers ---
const STATUS_LABELS = {
  pending: "Odottaa vahvistusta",
  hold: "Väliaikainen varaus",
  confirmed: "Vahvistettu",
  declined: "Peruttu",
};
const STATUS_VARIANT = {
  pending: "pending",
  hold: "pending",
  confirmed: "ok",
  declined: "bad",
};

const getBookingDateTime = (booking) => {
  if (!booking?.date || !booking?.start) return null;

  const timeStr = String(booking.start).slice(0, 5); // "HH:MM"
  return combineDateTime(booking.date, timeStr);
};

const isPastBooking = (booking) => {
  const dt = getBookingDateTime(booking);
  if (!dt) return true;
  return dt.getTime() < Date.now();
};

const hoursUntil = (booking) => {
  const dt = getBookingDateTime(booking);
  if (!dt) return -999;
  return (dt.getTime() - Date.now()) / (1000 * 60 * 60);
};

const canReschedule = (booking) => {
  // >= 24h до начала
  return hoursUntil(booking) >= 24;
};

const isWithin24h = (booking) => {
  const h = hoursUntil(booking);
  return h >= 0 && h < 24;
};

// --- styles ---
const Page = styled.div`
  max-width: 960px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const Heading = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Table = styled.div`
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 2.4fr 1.6fr 2fr;
  padding: 12px 20px;
  background: #f9fafb;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
`;
const HeaderCell = styled.div``;

const BookingRow = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 2.4fr 1.6fr 2fr;
  padding: 14px 20px;
  align-items: center;
  border-top: 1px solid #f3f4f6;
  background: #ffffff;
  opacity: ${({ $past }) => ($past ? 0.55 : 1)};
`;

const Cell = styled.div`
  font-size: 14px;
  color: #111827;
`;

const TreatmentLink = styled(Link)`
  font-weight: 500;
  text-decoration: none;
  color: #111827;
  &:hover {
    text-decoration: underline;
  }
`;

const DateText = styled.div`
  font-size: 14px;
`;

const SubInfo = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  ${({ $variant }) => {
    switch ($variant) {
      case "ok":
        return `background: #e5f9e7;color: #166534;`;
      case "pending":
        return `background: #fef9c3;color: #854d0e;`;
      case "bad":
        return `background: #fee2e2;color: #b91c1c;`;
      default:
        return `background: #e5e7eb;color: #374151;`;
    }
  }}
`;

const ActionsCell = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
`;
// Кнопки — оставляю твои же стили (без больших изменений)
//
const PrimaryButton = styled.button`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #8aa300;
  background: #8aa300;
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.1s ease;
  &:hover {
    background: #7a9000;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
    background: #ffffff;
  }
`;

// Tooltip показываем при hover на disabled-кнопку.
// Важно: disabled button НЕ ловит hover мыши, поэтому оборачиваем в span.
const DisabledButtonWrap = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const HoverText = styled.span`
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  background: #ffffff;
  color: #444;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 50;
  ${DisabledButtonWrap}:hover & {
    opacity: 1;
  }
`;
const Message = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #4b5563;
`;

// --- component ---
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    if (!jwt) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_URL}/my-bookings`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (!res.ok) {
          throw new Error(`Virhe ladattaessa varauksia (status ${res.status})`);
        }
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("BOOKINGS ERROR:", err);
        setError("Varauksia ei voitu ladata.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [jwt]);

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      const aDt = getBookingDateTime(a);
      const bDt = getBookingDateTime(b);
      if (!aDt && !bDt) return 0;
      if (!aDt) return 1;
      if (!bDt) return -1;
      return aDt - bDt;
    });
  }, [bookings]);

  const handleRebook = (booking) => {
    const t = booking.treatment?.attributes || booking.treatment || {};
    if (!t.slug) return;
    navigate(`/treatment/${t.slug}`);
  };

  const handleChangeTime = (booking) => {
    const t = booking.treatment?.attributes || booking.treatment || {};
    if (!t.slug) return;
    navigate(`/treatment/${t.slug}?change=${booking.id}`);
  };

  if (!jwt) {
    return (
      <Page>
        <Heading>Omat varaukset</Heading>
        <Message>Kirjaudu sisään nähdäksesi omat varauksesi.</Message>
      </Page>
    );
  }
  return (
    <Page>
      <Heading>Omat varaukset</Heading>
      {loading && <Message>Ladataan varauksia...</Message>}
      {error && !loading && <Message>{error}</Message>}
      {!loading && !error && sortedBookings.length === 0 && (
        <Message>Sinulla ei ole vielä varauksia.</Message>
      )}

      {!loading && !error && sortedBookings.length > 0 && (
        <Table>
          <HeaderRow>
            <HeaderCell>Hoito</HeaderCell>
            <HeaderCell>Päivä &amp; aika</HeaderCell>
            <HeaderCell>Tila</HeaderCell>
            <HeaderCell style={{ textAlign: "right" }}>Toiminnot</HeaderCell> 
          </HeaderRow>

          {sortedBookings.map((b) => {
            const past = isPastBooking(b);
            const statusKey = b.status || "";
            const statusLabel = STATUS_LABELS[statusKey] || "-";
            const statusVariant = STATUS_VARIANT[statusKey] || "default";
            const t = b.treatment?.attributes || b.treatment || {};
            const treatmentTitle = t.title || "Hoito";
            const treatmentSlug = t.slug;
            const dt = getBookingDateTime(b);
            const dateStr = dt
              ? dt.toLocaleDateString("fi-FI", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "-";
            const timeStr = dt
              ? dt.toLocaleTimeString("fi-FI", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";
            const locationLabel = b.location
              ? formatLocationLabel(b.location)
              : "";
            const showRebook = past; // правило №3
            //
            const showChange = !past; // правило №1 и №2
            //
            const changeEnabled = canReschedule(b); // правило №1
            //
            const changeDisabled = !changeEnabled && isWithin24h(b); // правило №2 (в пределах 24ч)
            return (
              <BookingRow key={b.id} $past={past}>
                <Cell>
                  {treatmentSlug ? (
                    <TreatmentLink to={`/treatment/${treatmentSlug}`}>
                      {treatmentTitle}
                    </TreatmentLink>
                  ) : (
                    <span>{treatmentTitle}</span>
                  )}
                  {locationLabel && <SubInfo>Paikka: {locationLabel}</SubInfo>} 
                </Cell>

                <Cell>
                  <DateText>
                    Päivä &amp; aika {dateStr} 
                    {timeStr ? ` klo ${timeStr}` : ""}
                  </DateText>
                </Cell>

                <Cell>
                  <StatusBadge $variant={statusVariant}>
                    {statusLabel}
                  </StatusBadge>
                </Cell>

                <ActionsCell>
                  {showChange && (
                    <>
                      {changeEnabled ? (
                        <SecondaryButton
                          type="button"
                          onClick={() => handleChangeTime(b)}
                        >
                          Muuta aikaa 
                        </SecondaryButton> // < 24h: кнопка есть, но disabled, tooltip по hover на wrapper
                      ) : (
                        <DisabledButtonWrap>
                          <SecondaryButton type="button" disabled>
                            Muuta aikaa 
                          </SecondaryButton>

                          {changeDisabled && (
                            <HoverText>
                              Muutokset mahdollisia 24 h ennen varattua aikaa.
                            </HoverText>
                          )}
                        </DisabledButtonWrap>
                      )}
                    </>
                  )}

                  {showRebook && (
                    <PrimaryButton
                      type="button"
                      onClick={() => handleRebook(b)}
                    >
                      Varaa uudelleen
                    </PrimaryButton>
                  )}
                </ActionsCell>
              </BookingRow>
            );
          })}
        </Table>
      )}
    </Page>
  );
};
export default MyBookings;
