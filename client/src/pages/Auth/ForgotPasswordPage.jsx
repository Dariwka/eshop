import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../../responsive";
import { notifyResetLinkSent } from "../../utils/toastService";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 480px;
  margin: 0 auto;
  ${mobile({ padding: "20px 10px" })}
`;
const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 24px 28px;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
`;
const Text = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 20px;
`;
const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
`;
const Input = styled.input`
  width: 100%;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  padding: 10px 14px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 1px rgba(22, 163, 74, 0.1);
  }
`;
const Button = styled.button`
  width: 100%;
  margin-top: 16px;
  border-radius: 999px;
  background: #16a34a;
  color: #fff;
  font-weight: 600;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
const ErrorBox = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 13px;
`;
const SuccessBox = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #ecfdf5;
  color: #166534;
  font-size: 13px;
`;
const SmallLink = styled.div`
  margin-top: 16px;
  font-size: 13px;
  text-align: center;
  a {
    color: #2563eb;
    text-decoration: underline;
  }
`;
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Syötä sähköpostiosoite.");
      return;
    }
    try {
      setSending(true);

      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Forgot error:", data);
        throw new Error(
          data?.error?.message || "Salasanan palautus epäonnistui."
        );
      }
      setSuccess(
        "Jos sähköpostiosoite löytyy järjestelmästä, lähetimme ohjeet salasanan vaihtoon."
      );
      notifyResetLinkSent();
      setEmail("");
    } catch (err) {
      setError(
        err.message ||
          "Salasanan palautus epäonnistui. Yritä hetken päästä uudelleen."
      );
    } finally {
      setSending(false);
    }
  };
  return (
    <Container>
      <Card>
        <Title>Unohtuiko salasana?</Title> 
        <Text>
          Syötä rekisteröity sähköpostiosoite. Lähetämme sinulle linkinsalasanan
          vaihtamiseen, jos osoite löytyy järjestelmästä. 
        </Text>
        <form onSubmit={handleSubmit}>
          <Label>Sähköposti</Label> 
          <Input
            type="email"
            placeholder="sina@esimerkki.fi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={sending}>
            {sending ? "Lähetetään..." : "Lähetä palautuslinkki"}   
          </Button>
        </form>
        {error && <ErrorBox>{error}</ErrorBox>} 
        {success && <SuccessBox>{success}</SuccessBox>} 
        <SmallLink>
          Muistitko sittenkin salasanan?  
          <Link to="/login">Takaisin kirjautumiseen</Link> 
        </SmallLink>
      </Card>
    </Container>
  );
};
export default ForgotPasswordPage;
