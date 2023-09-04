import React, { useEffect, useRef, useState } from "react";
import "./TrainingBooking.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

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
          console.log("SUCCESS!", response);
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
    <div className="trainingContainer">
      <div className="wrapper">
        <form ref={form} onSubmit={submitTraining}>
          <div className="inputField">
            <input
              required
              type="text"
              placeholder="Name"
              value={values.name}
              name="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Surname"
              required
              value={values.surname}
              name="surname"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="name.surname@gmail.com"
              required
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+358-500-12-12-12"
              required
              value={values.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company"
              value={values.company}
              onChange={handleChange}
            />
            <input
              type="number"
              id="ytunnus"
              name="ytunnus"
              placeholder="Y-tunnus or VAT number"
              value={values.ytunnus}
              onChange={handleChange}
            />
          </div>
          <div className="submitButton">
            <button type="submit" className="submit">
              Submit
            </button>
            <button type="cancel" className="cancel" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default TrainingBooking;
