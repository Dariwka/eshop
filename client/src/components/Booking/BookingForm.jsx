import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import { mobile } from "../../responsive";

const BookingContainer = styled.div`
  position: absolute;
  right: 275px;
  top: 450px;
  z-index: 999;
  background-color: #fff;
  padding: 20px;
  box-shadow: -12px 5px 28px -6px rgba(0, 0, 0, 0.62);
  -webkit-box-shadow: -12px 5px 28px -6px rgba(0, 0, 0, 0.62);
  -moz-box-shadow: -12px 5px 28px -6px rgba(0, 0, 0, 0.62);
  ${mobile({ width: "85%", right: "20px", top: "450px" })};
`;

const Wrapper = styled.div``;

const FormContainer = styled.form`
  box-sizing: border-box;
  border-radius: 1rem;
  background-color: hsl(0, 0%, 100%);
  border: 4px solid hsl(0, 0%, 90%);
`;

const InputField = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  ${mobile({ gridTemplateColumns: "auto", gap: "1rem" })};
`;
const InputText = styled.input`
  padding: 5px;
`;

const Acceptation = styled.div`
  padding: 0 2rem 0.5rem;
`;
const Label = styled.label`
  padding: 0.5rem;
  font-size: 14px;
  font-weight: 400;
`;

const SubmitButton = styled.div`
  text-align: center;
`;

const Submit = styled.button`
  width: 30%;
  margin: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-color: rgb(53, 183, 53);
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: green;
    border-color: green;
    color: white;
  }
`;
const Cancel = styled.button`
  width: 30%;
  margin: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-color: rgb(255, 79, 79);
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: red;
    border-color: red;
    color: white;
  }
`;

const BookingForm = ({ treatment, close }) => {
  const form = useRef();
  const { data } = useFetch(`/time-Slots?populate=*`);

  const [values, setValues] = useState({
    date: "",
    time: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    treatment: treatment,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (status === "SUCCESS") {
      toast.success("You successfulle booked your treatment", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        setStatus("");
        close();
      }, 3000);
    }
  }, [status, close]);

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.REACT_APP_APPOINTMENT_SERVICE_ID,
        process.env.REACT_APP_APPOINTMENT_TEMPLATE_ID,
        values,
        process.env.REACT_APP_APPOINTMENT_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.text);
          setValues({
            date: "",
            time: "",
            name: "",
            surname: "",
            email: "",
            phone: "",
            treatment: treatment,
          });
          setStatus("SUCCESS");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };

  return (
    <BookingContainer>
      <Wrapper>
        <FormContainer ref={form} onSubmit={handleSubmitAppointment}>
          <InputField>
            <InputText
              type="date"
              name="date"
              placeholder="Choose day"
              onChange={handleChange}
              required
            />
            <select
              defaultValue={"DEFAULT"}
              type="time"
              name="time"
              required
              onChange={handleChange}
            >
              <option disabled value="DEFAULT">
                Time
              </option>
              {data?.map((item) => (
                <option
                  value={values.time}
                  type="time"
                  name="time"
                  key={item?.attributes?.id}
                >
                  {item?.attributes?.time.slice(0, 5)}
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
          </InputField>
          <Acceptation>
            <InputText type="checkbox" id="accept" required />
            <Label htmlFor="accept">
              I accept that I'm informed about contradiction and I don't have
              any illness that can preclude this treatment.
            </Label>
          </Acceptation>
          <SubmitButton>
            <Submit>Submit</Submit>
            <Cancel onClick={close}>Cancel</Cancel>
          </SubmitButton>
        </FormContainer>
        <ToastContainer />
      </Wrapper>
    </BookingContainer>
  );
};

export default BookingForm;
