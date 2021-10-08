import React from "react";
import styles from "./Card.module.scss";

const Card = (props) => {
  const classes = props.className + " " + styles.card;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
