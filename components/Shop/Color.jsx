import React, { useState } from "react";
import styles from "./Color.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartFormActions } from "../../store/cart-form";

const Color = (props) => {
  const dispatch = useDispatch();
  const pattern = useSelector((state) => state.cartFormReducer.pattern);

  const highlightOnChange = () => {
    dispatch(cartFormActions.changePattern(props.color));
    dispatch(cartFormActions.changeMediaURL(props.mediaURL));
    props.changeErrorState();
  };

  return (
    <li className={styles.colorList}>
      <label className={styles.colorLabel}>
        <input
          type="radio"
          onClick={highlightOnChange}
          className={styles.color}
          value={props.color}
        />
        <span
          style={{
            background: `url(${props.mediaURL})`,
            backgroundSize: "50px 50px",
          }}
          className={`${styles.colorSwatch} ${
            pattern === props.color && styles.swatchHighlight
          }`}
        ></span><strong>
        {`${props.color && props.color.toUpperCase()}`}</strong>
      </label>
    </li>
  );
};

export default Color;
