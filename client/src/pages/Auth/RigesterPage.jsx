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

  ${mobile({
    padding: "24px 12px 40px",
  })}
`;

const Card = styled.section`
  width: 100%;
  max-width: 520px;
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
const FieldRow = styled.div`
  display: flex;
  gap: 12px;

  ${mobile({
    flexDirection: "column",
  })}
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
const Select = styled.select`
  width: 100%;
  padding: 9px 11px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
  background: #fff;
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

const SmallLink = styled(Link)`
  color: #2563eb;
  text-decoration: underline;
  font-size: 13px;
`;

const API_URL =
  process.env.REACT_APP_API_URL || "https://kosmedikbackend.onrender.com/api";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(""); // private | pro
  //
  const [accountType, setAccountType] = useState("private"); // extra for pro
  //
  const [companyName, setCompanyName] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !password2) {
      setError("Täytä sähköposti ja salasanat.");
      return;
    }
    if (password.length < 6) {
      setError("Salasanassa tulee olla vähintään 6 merkkiä.");
      return;
    }
    if (password !== password2) {
      setError("Salasanat eivät täsmää.");
      return;
    }
    setLoading(true);
    try {
      // 1) зарегистрировать пользователя//
      const registerRes = await axios.post(`${API_URL}/auth/local/register`, {
        username: email,
        email,
        password,
      });
      const { jwt, user } = registerRes.data || {};
      if (!jwt || !user) {
        throw new Error("JWT tai käyttäjätiedot puuttuvat vastauksesta");
      }
      // Сохранить auth в localStorage (как в логине)//
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", jwt);
      // 2) создать customer profile//
      try {
        await axios.post(
          `${API_URL}/customer-profiles`,
          {
            data: {
              firstName: firstName || null,
              lastName: lastName || null,
              phone: phone || null,
              accountType: accountType === "pro" ? "professional" : "private",
              // значения из enum в CustomerProfile//
              companyName: accountType === "pro" ? companyName || null : null,
              businessId: accountType === "pro" ? businessId || null : null,
              position: accountType === "pro" ? position || null : null,
              users_permissions_user: user.id,
            },
          },
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
      } catch (profileErr) {
        console.error(
          "PROFILE CREATE ERROR:",
          profileErr?.response || profileErr
        );
        // не блокируем регистрацию, просто лог//
      }
      // 3) если Pro-запрос — пометить заявку как pending//
      if (accountType === "pro") {
        try {
          await axios.put(
            `${API_URL}/users/${user.id}`,
            {
              proRequestStatus: "pending",
              // см. значения enum в Strapi//
            },
            { headers: { Authorization: `Bearer ${jwt}` } }
          );
          // обновим user в localStorage с новым статусом//
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, proRequestStatus: "pending" })
          );
        } catch (userErr) {
          console.error("USER UPDATE ERROR:", userErr?.response || userErr);
        }
      }
      // 4) редирект после успеха//
      window.location.href = "/account";
    } catch (err) {
      console.error("REGISTER ERROR:", err?.response?.data || err);
      const strapiErr = err?.response?.data?.error;
      if (strapiErr?.message === "Email is already taken") {
        setError("Tämä sähköposti on jo rekisteröity.");
      } else if (strapiErr?.message) {
        setError(strapiErr.message);
      } else {
        setError(
          "Rekisteröityminen epäonnistui. Yritä uudelleen hetken kuluttua."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page>
      <Card>
        <Title>Luo tili</Title>
        <Intro>
          Rekisteröidy käyttääksesi verkkokauppaa ja ammattilaistuotteita. Voit
          valita joko yksityisasiakkaan tai ammattilaisen tilin.
        </Intro>
        {error && <ErrorBox>{error}</ErrorBox>}
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Sähköposti *</Label>
            <Input
              type="email"
              placeholder="sina@esimerkki.fi"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <FieldRow>
            <div style={{ flex: 1 }}>
              <Label>Salasana *</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Salasana uudestaan *</Label>
              <Input
                type="password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
          </FieldRow>
          <FieldRow>
            <div style={{ flex: 1 }}>
              <Label>Etunimi</Label>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Sukunimi</Label>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </FieldRow>
          <div>
            <Label>Puhelin</Label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label>Tilin tyyppi</Label>
            <Select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="private">Yksityisasiakas</option>
              <option value="pro">Ammattilainen (kosmetologi / hoitola)</option>
            </Select>
          </div>
          {accountType === "pro" && (
            <>
              <FieldRow>
                <div style={{ flex: 1 }}>
                  <Label>Yrityksen nimi / toimipaikka</Label>
                  <Input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Label>Y-tunnus</Label>
                  <Input
                    type="text"
                    value={businessId}
                    onChange={(e) => setBusinessId(e.target.value)}
                  />
                </div>
              </FieldRow>
              <div>
                <Input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Luodaan tiliä..." : "Rekisteröidy"}
          </Button>
        </Form>
        <HelpText>
          Sinulla on jo tili?
          <SmallLink to="/login"> Kirjaudu sisään</SmallLink>.
        </HelpText>
      </Card>
    </Page>
  );
};
export default RegisterPage;
