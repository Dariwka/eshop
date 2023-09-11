import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { mobile } from "../../responsive";

const TrainingContainer = styled.div`
  width: 420px;
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

const Wrapper = styled.div`
  width: 100%;
`;

const StyledForm = styled.form`
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

const StyledInput = styled.input`
  padding: 5px;
`;

const Buttons = styled.div`
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

const TrainingBooking = ({
  trainingTime,
  trainingDate,
  trainingTitle,
  close,
}) => {
  const form = useRef();

  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    company: "",
    ytunnus: "",
    trainingDate: trainingDate,
    trainingTime: trainingTime,
    trainingTitle: trainingTitle,
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
      toast.success("You successfulle created your training reservation", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        setStatus("");
        close();
      }, 3000);
    }
  }, [status, close]);

  const submitTraining = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.REACT_APP_TRAINING_SERVICE_ID,
        process.env.REACT_APP_TRAINING_TEMPLATE_ID,
        values,
        process.env.REACT_APP_TRAINING_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.text);
          setValues({
            name: "",
            surname: "",
            email: "",
            phone: "",
            company: "",
            ytunnus: "",
            trainingDate: trainingDate,
            trainingTime: trainingTime,
            trainingTitle: trainingTitle,
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
    <TrainingContainer>
      <Wrapper>
        <StyledForm ref={form} onSubmit={submitTraining}>
          <InputField>
            <StyledInput
              required
              type="text"
              placeholder="Name"
              value={values.name}
              name="name"
              onChange={handleChange}
            />
            <StyledInput
              type="text"
              placeholder="Surname"
              required
              value={values.surname}
              name="surname"
              onChange={handleChange}
            />
            <StyledInput
              type="email"
              placeholder="name.surname@gmail.com"
              required
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            <StyledInput
              type="tel"
              id="phone"
              name="phone"
              placeholder="+358-500-12-12-12"
              required
              value={values.phone}
              onChange={handleChange}
            />
            <StyledInput
              type="text"
              id="company"
              name="company"
              placeholder="Company"
              value={values.company}
              onChange={handleChange}
            />
            <StyledInput
              type="number"
              id="ytunnus"
              name="ytunnus"
              placeholder="Y-tunnus or VAT number"
              value={values.ytunnus}
              onChange={handleChange}
            />
          </InputField>
          <Buttons>
            <Submit type="submit" className="submit">
              Submit
            </Submit>
            <Cancel type="cancel" className="cancel" onClick={close}>
              Cancel
            </Cancel>
          </Buttons>
        </StyledForm>
        <ToastContainer />
      </Wrapper>
    </TrainingContainer>
  );
};
export default TrainingBooking;
