import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { mobile } from "../../responsive";

const Page = styled.main`
  min-height: calc(100vh - 80px);
  background: #f5f5f7;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px 60px;
  ${mobile({ padding: "24px 12px 40px" })}
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

const SuccessBox = styled.div`
  margin-bottom: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
  background: #ecfdf3;
  color: #166534;
  border: 1px solid #bbf7d0;
`;

const SmallLink = styled(Link)`
  color: #2563eb;
  text-decoration: underline;
  font-size: 13px;
  &:hover {
    text-decoration: none;
  }
`;

const API_URL =
  process.env.REACT_APP_API_URL || "https://kosmedikbackend.onrender.com/api";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Syötä sähköpostiosoite.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      setSuccess(
        "Jos sähköpostiosoite löytyy järjestelmästä, saat pian ohjeet salasanan vaihtoon."
      );
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err?.response?.data || err);
      setError(
        "Salasanan palautus epäonnistui. Tarkista sähköposti tai yritä myöhemmin uudelleen."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page>
      <Card>
        <Title>Unohtuiko salasana?</Title>
        <Intro>
          Syötä rekisteröity sähköpostiosoite. Lähetämme sinulle linkinsalasanan
          vaihtamiseen, jos osoite löytyy järjestelmästä.
        </Intro>
        {error && <ErrorBox>{error}</ErrorBox>}
        {success && <SuccessBox>{success}</SuccessBox>}
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Sähköposti</Label>
            <Input
              type="email"
              placeholder="sina@esimerkki.fi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Lähetetään..." : "Lähetä palautuslinkki"} 
          </Button>
        </Form>

        <p style={{ marginTop: 12, fontSize: 13 }}>
          Muistitko sittenkin salasanan?
          <SmallLink to="/login"> Takaisin kirjautumiseen</SmallLink>
        </p>
      </Card>
    </Page>
  );
};
export default ForgotPasswordPage;
