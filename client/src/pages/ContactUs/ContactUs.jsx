import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import SelectField from "../../components/SelectField/SelectField";
import InputField from "../../components/InputField/InputField";
import TextArea from "../../components/TextArea/TextArea";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ContainerContact = styled.div`
  width: 100%;
  background: linear-gradient(rgb(255, 255, 255, 0.5), rgb(255, 255, 255, 0.5)),
    url("https://res.cloudinary.com/lvimeridijan/image/upload/v1692866812/kosmedik/IMG_2844-scaled_wthwu1.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  margin: 15px;
  padding: 20px;
  width: 30%;
  background-color: white;
  ${mobile({ width: "80% ", padding: "10px" })}
`;

const Title = styled.h1`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  padding: 10px;
  background-color: green;
  color: white;
`;

const ContactUs = () => {
  const form = useRef();

  const [values, setValues] = useState({
    subject: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status === "SUCCESS") {
      toast.success("Thank you! Your message has been sent!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.REACT_APP_SERVICE_KEY,
        process.env.REACT_APP_TEMPLATE_KEY,
        values,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.text);
          setValues({
            subject: "",
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setStatus("SUCCESS");
          window.scrollTo(0, 0);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };

  useEffect(() => {
    if (status === "SUCCESS") {
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }, [status]);

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ContainerContact>
      <Wrapper>
        <Title>CONTACT FORM</Title>
        <form ref={form} onSubmit={handleSubmit}>
          <SelectField
            handleChange={handleChange}
            name="subject"
            label="Subject"
          />
          <InputField
            value={values.name}
            handleChange={handleChange}
            label="Name"
            name="name"
            type="text"
            placeholder="Name Surname"
          />
          <InputField
            value={values.email}
            handleChange={handleChange}
            label="Email"
            name="email"
            type="email"
            placeholder="name.surname@example.com"
          />
          <InputField
            value={values.phone}
            handleChange={handleChange}
            label="Phone"
            name="phone"
            type="phone"
            placeholder="+358 454545454"
          />
          <TextArea
            value={values.message}
            handleChange={handleChange}
            label="MESSAGE"
            name="message"
          />
          <Button type="submit">SEND</Button>
        </form>
        <ToastContainer />
      </Wrapper>
    </ContainerContact>
  );
};

export default ContactUs;
