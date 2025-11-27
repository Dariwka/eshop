import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { getCurrentUser, isProUser } from "../../utils/auth";
import { makeRequest } from "../../makeRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- styled ---------- */
const Page = styled.div`
  font-family: "Urbanist", sans-serif;
  padding: 30px 50px;
  max-width: 900px;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;
const ProBadge = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  background: #047857;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;
const EmailRow = styled.div`
  margin-bottom: 24px;
  color: #4b5563;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 24px 0 10px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #047857;
    box-shadow: 0 0 0 1px #04785722;
  }
`;

const Select = styled.select`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #047857;
    box-shadow: 0 0 0 1px #04785722;
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  margin-top: 8px;
`;

const SaveButton = styled.button`
  margin-top: 24px;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  background: #047857;
  color: white;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

/* ---------- компонент ---------- */
const AccountPage = () => {
  const user = getCurrentUser();
  const pro = isProUser();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    accountType: "private", // или "business"
    deliveryAddress: "",
    deliveryPostcode: "",
    deliveryCity: "",
    deliveryCountry: "FI",
    companyName: "",
    businessId: "",
    vatNumber: "",
    position: "",
    billingAddress: "",
    billingPostcode: "",
    billingCity: "",
    billingCountry: "FI",
    deliverySameAsBilling: true,
  });

  const isBusiness = useMemo(
    () => form.accountType === "business",
    [form.accountType]
  );

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError("Sinun täytyy kirjautua sisään nähdäksesi tilisi tiedot.");
      return;
    }
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await makeRequest.get(
          `/customer-profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
        );
        const item = res.data?.data?.[0];
        if (item) {
          setProfileId(item.id);
          const a = item.attributes || {};
          setForm((prev) => ({
            ...prev,
            firstName: a.firstName || "",
            lastName: a.lastName || "",
            phone: a.phone || "",
            accountType: a.accountType || "private",
            deliveryAddress: a.deliveryAddress || "",
            deliveryPostcode: a.deliveryPostcode || "",
            deliveryCity: a.deliveryCity || "",
            deliveryCountry: a.deliveryCountry || "FI",
            companyName: a.companyName || "",
            businessId: a.businessId || "",
            vatNumber: a.vatNumber || "",
            position: a.position || "",
            billingAddress: a.billingAddress || "",
            billingPostcode: a.billingPostcode || "",
            billingCity: a.billingCity || "",
            billingCountry: a.billingCountry || "FI",
            deliverySameAsBilling:
              typeof a.deliverySameAsBilling === "boolean"
                ? a.deliverySameAsBilling
                : true,
          }));
        }
      } catch (e) {
        console.error("fetch profile error", e);
        setError("Tietojen lataaminen epäonnistui.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      setSaving(true);
      setError("");
      const payload = { data: { ...form, users_permissions_user: user.id } };
      if (profileId) {
        await makeRequest.put(`/customer-profiles/${profileId}`, payload);
      } else {
        const res = await makeRequest.post(`/customer-profiles`, payload);
        setProfileId(res.data?.data?.id || null);
      }
      toast.success("Tiedot tallennettu onnistuneesti");
    } catch (e) {
      console.error("save profile error", e);
      setError("Tallennus epäonnistui.");
      toast.error("Tallennus epäonnistui");
    } finally {
      setSaving(false);
    }
  };
  if (!user) {
    return (
      <Page>
        <Title>Oma tili</Title>
        <p>Kirjaudu sisään nähdäksesi tilisi tiedot.</p>
      </Page>
    );
  }
  return (
    <Page>
      <HeaderRow>
        <Title>Oma tili</Title>
        {pro && <ProBadge>PRO</ProBadge>}
      </HeaderRow>
      <EmailRow>
        <b>Sähköposti:</b> {user.email}
      </EmailRow>
      {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}
      {loading ? (
        <p>Ladataan tietoja…</p>
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <SectionTitle>Perustiedot</SectionTitle>
            <Grid2>
              <Field>
                <Label>Etunimi</Label>
                <Input
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                />
              </Field>
              <Field>
                <Label>Sukunimi</Label>
                <Input
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                />
              </Field>
              <Field>
                <Label>Puhelin</Label>
                <Input value={form.phone} onChange={handleChange("phone")} />
              </Field>
              <Field>
                <Label>Tilityyppi</Label>
                <Select
                  value={form.accountType}
                  onChange={handleChange("accountType")}
                >
                  <option value="private">Yksityisasiakas</option>
                  <option value="business">Yritysasiakas</option>
                </Select>
              </Field>
            </Grid2>
            <SectionTitle>Toimitusosoite</SectionTitle>
            <Grid2>
              <Field>
                <Label>Osoite</Label>
                <Input
                  value={form.deliveryAddress}
                  onChange={handleChange("deliveryAddress")}
                />
              </Field>
              <Field>
                <Label>Postinumero</Label>
                <Input
                  value={form.deliveryPostcode}
                  onChange={handleChange("deliveryPostcode")}
                />
              </Field>
              <Field>
                <Label>Kaupunki</Label>
                <Input
                  value={form.deliveryCity}
                  onChange={handleChange("deliveryCity")}
                />
              </Field>
              <Field>
                <Label>Maa</Label>
                <Input
                  value={form.deliveryCountry}
                  onChange={handleChange("deliveryCountry")}
                />
              </Field>
            </Grid2>
            {isBusiness && (
              <>
                <SectionTitle>Yritystiedot</SectionTitle>
                <Grid2>
                  <Field>
                    <Label>Yrityksen nimi</Label>
                    <Input
                      value={form.companyName}
                      onChange={handleChange("companyName")}
                    />
                  </Field>
                  <Field>
                    <Label>Y-tunnus</Label>
                    <Input
                      value={form.businessId}
                      onChange={handleChange("businessId")}
                    />
                  </Field>
                  <Field>
                    <Label>ALV-numero (VAT)</Label>
                    <Input
                      value={form.vatNumber}
                      onChange={handleChange("vatNumber")}
                    />
                  </Field>
                  <Field>
                    <Label>Tehtävänimike</Label>
                    <Input
                      value={form.position}
                      onChange={handleChange("position")}
                    />
                  </Field>
                </Grid2>
              </>
            )}
            <SectionTitle>Laskutusosoite</SectionTitle>           
            <CheckboxRow>
              <input
                type="checkbox"
                checked={form.deliverySameAsBilling}
                onChange={handleChange("deliverySameAsBilling")}
              />
                Toimitusosoite sama kuin laskutusosoite           
            </CheckboxRow>
            {!form.deliverySameAsBilling && (
              <Grid2>
                <Field>
                    <Label>Osoite</Label>                 
                  <Input
                    value={form.billingAddress}
                    onChange={handleChange("billingAddress")}
                  />
                </Field>
                <Field>
                    <Label>Postinumero</Label>                 
                  <Input
                    value={form.billingPostcode}
                    onChange={handleChange("billingPostcode")}
                  />
                </Field>
                <Field>
                    <Label>Kaupunki</Label>                 
                  <Input
                    value={form.billingCity}
                    onChange={handleChange("billingCity")}
                  />
                </Field>
                <Field>
                    <Label>Maa</Label>                 
                  <Input
                    value={form.billingCountry}
                    onChange={handleChange("billingCountry")}
                  />
                </Field>
              </Grid2>
            )}
            <SaveButton type="submit" disabled={saving}>
              {saving ? "Tallennetaan…" : "Tallenna"}
            </SaveButton>
          </Form>
          <InfoText>
            Näitä tietoja käytetään tilausten toimitusta ja laskutusta varten.
          </InfoText>
        </>
      )}
      <ToastContainer position="top-center" />   
    </Page>
  );
};
export default AccountPage;
