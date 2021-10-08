import React, { useState } from "react";
import Button from "../../components/UI/Button";
import styles from "./Contact.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { contactSliceActions } from "../../store/contact";
import FAQ from "../../components/Contact/FAQ";

const ContactUs = (props) => {
  const dispatch = useDispatch();
  const { name, email, message, form } = useSelector(
    (state) => state.contactReducer
  );
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch("/api/sendgrid/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });
    const res = await req.json();
    setMessageSent(res);
  };

  return (
    <>
      <div className={styles["contact-text-container"]}>
        <h1>Let's Chat</h1>
        <p>
          Unlike others, I reply. Reach me via the form below or checkout my
          FAQS
        </p>
      </div>
      <div className={styles['form-container']}>
        {!messageSent && (
          <form
            onSubmit={handleSubmit.bind(this)}
            action="submit"
            className={styles["form"]}
          >
            {name.blur && !name.valid && (
              <p className={styles["fallback-text"]}>
                Please enter a valid name
              </p>
            )}
            <input
              onChange={(e) => {
                dispatch(contactSliceActions.updateName(e.target.value));
              }}
              type="text"
              className={styles['input']}
              value={name.value}
              placeholder="Name"
              onBlur={() => dispatch(contactSliceActions.blurName())}
            />
            {email.blur && !email.valid && (
              <p className={styles["fallback-text"]}>
                Please enter a valid email
              </p>
            )}
            <input
              type="text"
              className={styles['input']}
              value={email.value}
              onChange={(e) => {
                dispatch(contactSliceActions.updateEmail(e.target.value));
              }}
              onBlur={() => dispatch(contactSliceActions.blurEmail())}
              placeholder="Email"
            />
            {message.blur && !message.valid && (
              <p className={styles["fallback-text"]}>
                Please enter a valid message
              </p>
            )}
            <textarea
              className={styles["text-area"]}
              value={message.value}
              placeholder="enter your message"
              onChange={(e) =>
                dispatch(contactSliceActions.updateMessage(e.target.value))
              }
              onBlur={() => dispatch(contactSliceActions.blurMessage())}
            />
            <Button disabled={`${form.valid ? "" : true}`} type="submit">
              Submit
            </Button>
          </form>
        )}
        {messageSent && (
          <p style={{ textAlign: "center" }}>
            <strong>Message has been sent 🐶</strong>
          </p>
        )}
      </div>

      <FAQ />
    </>
  );
};

export default ContactUs;
