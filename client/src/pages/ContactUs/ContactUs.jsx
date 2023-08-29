import React, { useEffect, useRef, useState } from "react";
import "./ContactUs.scss";
import emailjs from "@emailjs/browser";
import SelectField from "../../components/SelectField/SelectField";
import InputField from "../../components/InputField/InputField";
import TextArea from "../../components/TextArea/TextArea";

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
          console.log("SUCCESS!", response);
          setValues({
            subject: "",
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setStatus("SUCCESS");
        },
        (error) => {
          console.log("FAILED...", error);
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
    <div className="containerContact">
      <div className="wrapper">
        <h1>CONTACT FORM</h1>
        {status && renderAlert()}
        <form ref={form} onSubmit={handleSubmit}>
          <div style={{ padding: "1rem 0" }}>
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
            <button type="submit">SEND</button>
          </div>
        </form>
      </div>
    </div>
  );
};
const renderAlert = () => (
  <div className="success">
    <p>Thank you! Your message has been sent!</p>
  </div>
);

export default ContactUs;
