import React, { useEffect, useRef, useState } from "react";
import "./BookingForm.scss";
import emailjs from "@emailjs/browser";
import useFetch from "../../hooks/useFetch";

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
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }, [status]);

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
          console.log("SUCCESS!", response);
          setValues({
            date: "",
            time: "",
            name: "",
            surname: "",
            email: "",
            phone: "",
            treatment: treatment,
          });
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
    e.target.reset();
    close();
  };

  return (
    <div className="bookingContainer">
      <div className="wrapper">
        {status && renderAlert()}
        <form ref={form} onSubmit={handleSubmitAppointment}>
          <div className="inputField">
            <input
              type="date"
              name="date"
              placeholder="Choose day"
              onChange={handleChange}
              required
            />
            <select type="time" name="time" required onChange={handleChange}>
              <option disabled selected value>
                Time
              </option>
              {data?.map((item) => (
                <option type="time" name="time" key={item.id}>
                  {item?.attributes?.time.slice(0, 5)}
                </option>
              ))}
            </select>
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
          </div>
          <div className="acceptation">
            <input type="checkbox" id="accept" required />
            <label htmlFor="accept">
              I accept that I'm informed about contradiction and I don't have
              any illness that can preclude this treatment.
            </label>
          </div>
          <div className="submitButton">
            <button className="submit">Submit</button>
            <button className="cancel" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const renderAlert = () => (
  <div className="success">
    <p>Thank you! Your made an appointment!</p>
  </div>
);

export default BookingForm;
