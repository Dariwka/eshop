import React, { useEffect, useRef, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { getWorkHours, formatLocationLabel } from "../../utils/workHours";
import { generateSlots, subtractBusy } from "../../utils/slots";
import { hhmmToMin, toISODate, isPastDate } from "../../utils/time";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { mobile } from "../../responsive";

const BookingContainer = styled.div`
  position: absolute;
  right: 275px;
  top: 450px;
  z-index: 999;

  background-color: #fff;
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: -12px 5px 28px -6px;
  ${mobile({ width: "85%", right: "20px", top: "450px" })};
`;

const Wrapper = styled.div``;

const FormContainer = styled.form`
  box-sizing: border-box;
  border-radius: var(--radius);
  background-color: #fff;
  border: 1px solid var(--border);
  padding: var(--space-2);
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 1.5rem 1rem;
  /* сам селект поуже и по центру */
  select {
    width: 60%;
    margin: 0 auto;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg);
    color: var(--text);
    outline: none;
    transition: var(--transition);
  }

  select:focus {
    border-color: var(--brand);
    box-shadow: 0 0 3px color-mix(in srgb, var(--brand) 20%, transparent);
  }
  select:hover {
    border-color: var(--brand);
    box-shadow: 0 0 3px color-mix(in srgb, var(--brand) 20%, transparent);
  }
  ${mobile({
    "& select": { width: "100%" },
  })}
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
  padding: 0 1.5rem 1rem;
  ${mobile({ gridTemplateColumns: "1fr" })};

  input,
  select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg);
    color: var(--text);
    outline: none;
    transition: var(--transition);
  }

  input:focus,
  select:focus {
    border-color: var(--brand);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand) 20%, transparent);
  }

  select:hover {
    border-color: var(--brand);
    box-shadow: 0 0 3px color-mix(in srgb, var(--brand) 20%, transparent);
  }

  select:disabled {
    background: var(--soft);
    color: var(--muted);
    cursor: not-allowed;
  }
`;

const InputText = styled.input`
  padding: 5px;
`;

const Acceptation = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.45;

  input {
    flex: 0 0 auto;
    margin-top: 3px;
  }

  a {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const SubmitButton = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
  margin-top: var(--space-2);
  ${mobile({ gridTemplateColumns: "1fr" })}
`;

const Submit = styled.button`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius);
  background: var(--brand);
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    background: var(--brand-hover);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
const Cancel = styled.button`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius);
  background: var(--danger);
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--danger-hover);
  }
`;

const BookingForm = ({
  treatment,
  allowedLocations = [],
  initialLocation = "",
  close,
  mode,
}) => {
  const treat =
    treatment && treatment.attributes ? treatment.attributes : treatment || {};
  const treatmentTitle = treat.title || "";

  const form = useRef(null);
  // const { data } = useFetch(`/time-Slots?populate=*`);

  const [values, setValues] = useState({
    date: "",
    time: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    location: initialLocation,
  });

  const DEFAULT_LOCATIONS = ["Kannelmäki", "Malminkartano"];

  const RAW = allowedLocations.length ? allowedLocations : DEFAULT_LOCATIONS;

  const options = RAW.filter(
    (loc) => loc && String(loc).trim().toLowerCase() !== "any"
  );

  useEffect(() => {
    if (
      allowedLocations.length === 1 &&
      values.location &&
      allowedLocations[0]
    ) {
      setValues((v) => ({ ...v, location: allowedLocations[0] }));
    }
    if (
      allowedLocations.length > 1 &&
      values.location &&
      !allowedLocations.includes(values.location)
    ) {
      setValues((v) => ({ ...v, location: "" }));
    }
  }, [allowedLocations, values.location]);

  const [freeSlots, setFreeSlots] = useState([]);

  const [submitStatus, setSubmitStatus] = useState("");

  const { date, location } = values;

  const hours = useMemo(
    () => (date ? getWorkHours(location, date) : null),
    [location, date]
  );

  const busyUrl =
    date && location
      ? `/busy-slots?filters[date][$eq]=${date}` +
        `&filters[location][$eq]=${encodeURIComponent(location)}` +
        `&pagination[pageSize]=100`
      : null;

  const { data: busyRaw } = useFetch(busyUrl);

  const busyList = useMemo(() => {
    const arr = busyRaw || [];
    return arr.map((i) => ({
      start: i.attributes.start.slice(0, 5),
      end: i.attributes.end.slice(0, 5),
    }));
  }, [busyRaw]);

  const t = treatment?.attributes ?? treatment ?? {};
  const baseDurationMin = Number(t.duration) || 30;
  const GLOBAL_PADDING_MIN = 0;
  const durationMin = baseDurationMin + GLOBAL_PADDING_MIN;

  // собираем свободные слоты

  useEffect(() => {
    if (!hours) {
      setFreeSlots([]);
      return;
    }

    const base = generateSlots(hours); // [{from,to},...]

    const free = subtractBusy(base, busyList, durationMin, hours.end); // вычитаем занятое // если выбран сегодня — скрываем прошедшее время
    if (date === toISODate()) {
      const now = new Date();
      const nowMin = now.getHours() * 60 + now.getMinutes();
      setFreeSlots(free.filter((s) => hhmmToMin(s.from) > nowMin));
    } else {
      setFreeSlots(free);
    }
  }, [hours, busyList, date, durationMin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "location" || name === "date") {
      setValues((v) => ({ ...v, [name]: value, time: "" }));
      return;
    }
    setValues((v) => ({ ...v, [name]: value }));
  };

  const successText =
    mode === "reschedule"
      ? "Ajanmuutospyyntö on lähetetty. Saat vahvistuksen sähköpostitse"
      : "Varauspyyntö on lähetetty. Saat vahvistuksen sähköpostitse";

  useEffect(() => {
    if (submitStatus === "SUCCESS") {
      toast.success(successText, { position: toast.POSITION.TOP_CENTER });
      const t = setTimeout(() => {
        setSubmitStatus("");
        close(); // закрываем модалку
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [submitStatus, close, successText]);

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    const { date, time, location, name, surname, email, phone } = values; // 1) базовая валидация
    if (!date || !time || !location || !name || !surname || !email || !phone) {
      toast.error("Please fill all fields.");
      return;
    } // 2) дата не в прошлом
    if (isPastDate(date)) {
      toast.error("Selected date is in the past.");
      return;
    } // 3) выбранный слот всё еще свободен
    const slotIsFree = freeSlots.some((s) => s.from === time);
    if (!slotIsFree) {
      toast.error(
        "This time is no longer available. Please choose another slot."
      );
      return;
    } // 4) отправка email
    try {
      await emailjs.send(
        process.env.REACT_APP_APPOINTMENT_SERVICE_ID,
        process.env.REACT_APP_APPOINTMENT_TEMPLATE_ID,
        {
          date,
          time,
          name,
          surname,
          email,
          location: formatLocationLabel(location),
          treatment: treatmentTitle, // строка с названием процедуры (из пропса)
          phone,
        },
        process.env.REACT_APP_APPOINTMENT_PUBLIC_KEY
      ); // очистка формы
      setValues((v) => ({
        date: "",
        time: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        treatment,
        location: "",
      }));
      setSubmitStatus("SUCCESS"); // если используешь <form ref={form}>, можно дополнительно:
      e.target.reset();
    } catch (err) {
      console.log("FAILED...", err?.text || err);
      setSubmitStatus("ERROR");
      toast.error("Failed to send the request. Please try again.");
    }
  };

  return (
    <BookingContainer>
      <Wrapper>
        <FormContainer ref={form} onSubmit={handleSubmitAppointment}>
          <TopRow>
            <select
              id="location"
              name="location"
              value={values.location}
              onChange={(e) =>
                setValues((v) => ({ ...v, location: e.target.value }))
              }
              disabled={options.length === 1}
              required
            >
              {options.length > 1 && (
                <option value="" disabled>
                  Select location
                </option>
              )}
              {options.map((loc) => (
                <option key={loc} value={loc}>
                  {formatLocationLabel(loc)}
                </option>
              ))}
            </select>
          </TopRow>
          <FieldsGrid>
            <InputText
              id="date"
              type="date"
              lang="en-GB"
              name="date"
              min={toISODate()}
              value={values.date}
              onChange={handleChange}
              required
            />
            <select
              id="time"
              type="time"
              name="time"
              value={values.time}
              onChange={handleChange}
              disabled={
                !values.location || !values.date || freeSlots.length === 0
              }
              required
            >
              <option value="" disabled>
                {!values.location || !values.date
                  ? "Choose location & date first"
                  : hours === null
                  ? "Closed this day"
                  : freeSlots.length > 0
                  ? "Choose time"
                  : "No available time"}
              </option>
              {freeSlots.map((s) => (
                <option key={s.from} value={s.from}>
                  {s.from}
                </option>
              ))}
            </select>
            <InputText
              required
              type="text"
              placeholder="Name"
              value={values.name}
              name="name"
              onChange={handleChange}
            />
            <InputText
              type="text"
              placeholder="Surname"
              required
              value={values.surname}
              name="surname"
              onChange={handleChange}
            />
            <InputText
              type="email"
              placeholder="name.surname@gmail.com"
              required
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            <InputText
              type="tel"
              id="phone"
              name="phone"
              placeholder="+358-500-12-12-12"
              required
              value={values.phone}
              onChange={handleChange}
            />
          </FieldsGrid>
          <Acceptation>
            <input type="checkbox" id="accept" required />
            <label htmlFor="accept">
              Olen lukenut{" "}
              <a href="/precare" target="_blank" rel="noopener">
                hoito-ohjeet ja vasta-aiheet
              </a>{" "}
              ja vahvistan, ettei minulla ole vasta-aiheita.
            </label>
          </Acceptation>
          <SubmitButton>
            <Submit type="submit">Submit</Submit>
            <Cancel type="button" onClick={close}>
              Cancel
            </Cancel>
          </SubmitButton>
          <ToastContainer />
        </FormContainer>
      </Wrapper>
    </BookingContainer>
  );
};

export default BookingForm;
