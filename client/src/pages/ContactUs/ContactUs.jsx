import React, { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { mobile } from "../../responsive";

// ---------- СТИЛИ ----------
//
const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 20px;
  /* светлый оверлей + ваша фоновая картинка */
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("https://res.cloudinary.com/lvimeridijan/image/upload/v1692866812/kosmedik/IMG_2844-scaled_wthwu1.jpg")
      center/cover no-repeat;
  ${mobile({ padding: "60px 12px", minHeight: "auto" })}
`;

const Card = styled.div`
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 28px;
  ${mobile({ padding: "18px" })}
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 28px;
  line-height: 1.2;
  text-align: center;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 0 0 22px;
  text-align: center;
  color: #444;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 16px;
  ${mobile({ gridTemplateColumns: "1fr", gap: "12px" })}
`;

const Field = styled.div`
  grid-column: ${(p) => (p.full ? "1 / -1" : "auto")};
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
`;

const BaseInput = ` width: 100%; height: 44px; border: 1px solid #e3e3e3; border-radius: 10px; padding: 10px 12px; outline: none; font-size: 15px; background: #fff; transition: box-shadow .15s ease, border-color .15s ease;
 &:focus {  border-color: #7bb57a;  box-shadow: 0 0 0 3px rgba(123, 181, 122, 0.15); }
 &::placeholder { color: #9aa0a6; }`;

const Input = styled.input`
  ${BaseInput} border-color: ${(p) => (p.error ? "#e57373" : "#e3e3e3")};
`;

const Select = styled.select`
  ${BaseInput} appearance: none;
  border-color: ${(p) => (p.error ? "#e57373" : "#e3e3e3")};
  background-image: linear-gradient(45deg, transparent 50%, #777 50%),
    linear-gradient(135deg, #777 50%, transparent 50%);
  background-position: calc(100% - 22px) 18px, calc(100% - 16px) 18px;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
`;

const Textarea = styled.textarea`
  ${BaseInput} height: 120px;
  resize: vertical;
  border-color: ${(p) => (p.error ? "#e57373" : "#e3e3e3")};
`;
const Error = styled.div`
  margin-top: 6px;
  color: #d84343;
  font-size: 13px;
`;

const Actions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 4px;
`;

const Button = styled.button`
  min-width: 180px;
  height: 46px;
  border: none;
  border-radius: 999px;
  padding: 0 20px;
  font-weight: 600;
  color: #fff;
  background: ${(p) => (p.disabled ? "#b7d2b6" : "#4fa64b")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: transform 0.08s ease;
  &:active {
    transform: ${(p) => (p.disabled ? "none" : "scale(0.98)")};
  }
`;

// ---------- ДАННЫЕ ----------
//
const SUBJECT_OPTIONS = [
  { value: "", label: "Valitse aihe..." },
  { value: "general", label: "Yleinen kysymys" },
  { value: "booking", label: "Ajanvaraus" },
  { value: "order", label: "Tilaus / toimitus" },
  { value: "training", label: "Koulutus" },
];
// простая проверка email
//
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// ---------- КОМПОНЕНТ ----------
//
const ContactUs = () => {
  const formRef = useRef(null);
  const [values, setValues] = useState({
    subject: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const errors = useMemo(() => {
    const e = {};
    if (!values.subject) e.subject = "Valitse aihe.";
    if (!values.name.trim()) e.name = "Nimi on pakollinen.";
    if (!values.email.trim()) e.email = "Sähköposti on pakollinen.";
    else if (!emailRe.test(values.email))
      e.email = "Sähköposti on virheellinen.";
    if (!values.phone.trim()) e.phone = "Puhelin on pakollinen.";
    if (!values.message.trim()) e.message = "Viesti on pakollinen.";
    return e;
  }, [values]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // помечаем все поля как «троганные», чтобы показать ошибки
    //
    setTouched({
      subject: true,
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    if (!isValid) {
      // фокус на первое невалидное поле
      //
      const firstInvalid = [
        "subject",
        "name",
        "email",
        "phone",
        "message",
      ].find((key) => errors[key]);
      if (firstInvalid && formRef.current) {
        const el = formRef.current.querySelector(`[name="${firstInvalid}"]`);
        if (el) el.focus();
      }
      toast.error("Täytä kaikki kentät oikein.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      await emailjs.send(
        process.env.REACT_APP_SERVICE_KEY,
        process.env.REACT_APP_TEMPLATE_KEY,
        values,
        process.env.REACT_APP_PUBLIC_KEY
      );
      toast.success("Kiitos! Viestisi on lähetetty.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setValues({ subject: "", name: "", email: "", phone: "", message: "" });
      setTouched({});
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      toast.error("Lähetys epäonnistui. Yritä uudelleen.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <Section>
      <Card>
        <Title>Yhteydenottolomake</Title>
        <Subtitle> Täytä lomake – vastaamme mahdollisimman pian. </Subtitle>
        <Form ref={formRef} onSubmit={handleSubmit} noValidate>
          {/* Subject */}
          <Field full>
            <Label htmlFor="subject">Aihe *</Label>
            <Select
              id="subject"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.subject && !!errors.subject}
            >
              {SUBJECT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
            {touched.subject && errors.subject && (
              <Error>{errors.subject}</Error>
            )}
          </Field>
          {/* Name */}
          <Field>
            <Label htmlFor="name">Nimi *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Etunimi Sukunimi"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && !!errors.name}
              autoComplete="name"
            />
            {touched.name && errors.name && <Error>{errors.name}</Error>}
          </Field>
          {/* Email */}
          <Field>
            <Label htmlFor="email">Sähköposti *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nimi@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              autoComplete="email"
            />
            {touched.email && errors.email && <Error>{errors.email}</Error>}
          </Field>
          {/* Phone */}
          <Field>
            <Label htmlFor="phone">Puhelin *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+358 40 0000000"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && !!errors.phone}
              autoComplete="tel"
            />
            {touched.phone && errors.phone && <Error>{errors.phone}</Error>}
          </Field>
          {/* Message */}
          <Field full>
            <Label htmlFor="message">Viesti *</Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Kirjoita viestisi..."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.message && !!errors.message}
            />
            {touched.message && errors.message && (
              <Error>{errors.message}</Error>
            )}
          </Field>
          <Actions>
            <Button type="submit" disabled={!isValid}>
              Lähetä
            </Button>
          </Actions>
        </Form>
      </Card>
      <ToastContainer />
    </Section>
  );
};
export default ContactUs;
