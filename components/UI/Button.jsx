import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {
  const classes = `${props.className} ${styles.button}`;

  return (
    <button className={classes} disabled={props.disabled} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
