import React from "react";
import "./ContactUs.scss";
import { useState } from "react";

const ContactUs = () => {
  const [value, setValue] = useState({
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
        process.env.REACT_APP_USER_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response);
          setValues({
            aihe: "",
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
        <form action="submit"></form>
      </div>
    </div>
  );
};

export default ContactUs;
