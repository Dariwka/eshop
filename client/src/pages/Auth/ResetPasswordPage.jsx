import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mobile } from "../../responsive";

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
const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337/api";
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const c = params.get("code");
    if (!c) {
      setError("Virheellinen tai puuttuva palautuskoodi.");
    } else {
      setCode(c);
    }
  }, [location.search]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || !password2) {
      setError("Syötä uusi salasana kahdesti.");
      return;
    }
    if (password !== password2) {
      setError("Salasanat eivät täsmää.");
      return;
    }
    if (!code) {
      setError("Palautuskoodi puuttuu.");
      return;
    }
    try {
      setSending(true);
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation: password2,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Reset error:", data);
        throw new Error(
          data?.error?.message || "Salasanan vaihtaminen epäonnistui."
        );
      }
      setSuccess("Uusi salasana on asetettu. Voit nyt kirjautua sisään.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.message ||
          "Salasanan vaihtaminen epäonnistui. Yritä hetken päästä uudelleen."
      );
    } finally {
      setSending(false);
    }
  };
  return (
    <Container>
      <Card>
        <Title>Aseta uusi salasana</Title> 
        <Text>
          Syötä uusi salasana kahdesti. Varmista, että salasana on  riittävän
          vahva. 
        </Text>
        <form onSubmit={handleSubmit}>
          <Label>Uusi salasana</Label> 
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label>Uusi salasana uudelleen</Label> 
          <Input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button type="submit" disabled={sending || !code}>
            {sending ? "Tallennetaan..." : "Tallenna uusi salasana"} 
          </Button>
        </form>
        {error && <ErrorBox>{error}</ErrorBox>} 
        {success && <SuccessBox>{success}</SuccessBox>} 
        <SmallLink>
          Muistatko kuitenkin salasanan?  
          <Link to="/login">Takaisin kirjautumiseen</Link> 
        </SmallLink>
      </Card>
    </Container>
  );
};
export default ResetPasswordPage;
