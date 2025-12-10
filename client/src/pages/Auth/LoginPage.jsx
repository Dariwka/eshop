import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import axios from "axios";

const Page = styled.main`
  min-height: calc(100vh - 80px);
  background: #f5f5f7;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px 60px;

  ${mobile({
    padding: "24px 12px 40px",
  })}
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 18px;
  padding: 28px 26px 24px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px;
  color: #111827;
`;

const Intro = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 9px 11px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 1px rgba(22, 163, 74, 0.15);
  }
`;
const Button = styled.button`
  margin-top: 6px;
  width: 100%;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  background: #16a34a;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(22, 163, 74, 0.4);
  transition: background 0.15s ease, transform 0.08s ease, box-shadow 0.15s ease;

  &:hover {
    background: #15803d;
    transform: translateY(-1px);
    box-shadow: 0 16px 30px rgba(22, 163, 74, 0.45);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 8px 20px rgba(22, 163, 74, 0.35);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const HelpText = styled.p`
  margin-top: 10px;
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.5;
`;

const SmallLink = styled(Link)`
  color: #2563eb;
  text-decoration: underline;
  font-size: 12px;
  margin-left: 4px;

  &:hover {
    text-decoration: none;
  }
`;

const ErrorBox = styled.div`
  margin-bottom: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL =
    process.env.REACT_APP_API_URL || "https://kosmedikbackend.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Täytä sähköposti ja salasana.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/local`, {
        identifier: email,
        password,
      });
      if (!res?.data?.jwt) {
        throw new Error("JWT puuttuu vastauksesta");
      }
      localStorage.setItem("user", JSON.stringify(res.data.user || null));
      localStorage.setItem("jwt", res.data.jwt);
      window.location.href = "/";
    } catch (err) {
      console.error("LOGIN ERROR:", err?.response?.data || err);
      const strapiMsg = err?.response?.data?.error?.message;
      if (strapiMsg === "Invalid identifier or password") {
        setError("Virheellinen sähköposti tai salasana.");
      } else {
        setError("Kirjautuminen epäonnistui. Yritä uudelleen hetken kuluttua.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page>
      <Card>
        <Title>Kirjaudu sisään</Title>
        <Intro>
          Syötä sähköposti ja salasana käyttääksesi ammattilaistuotteita ja
          varauksia.
        </Intro>
        {error && <ErrorBox>{error}</ErrorBox>}
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Sähköposti</Label>
            <Input
              type="email"
              placeholder="sina@esimerkki.fi"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Salasana</Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Kirjaudutaan..." : "Kirjaudu"}
          </Button>
        </Form>
        <HelpText>
          Ei vielä tiliä?
          <SmallLink to="/register">Luo tili</SmallLink>
        </HelpText>
        <HelpText>
          Unohtuiko salasana?{" "}
          <SmallLink to="/forgot-password">Palauta salasana</SmallLink>
        </HelpText>
      </Card>
    </Page>
  );
}
