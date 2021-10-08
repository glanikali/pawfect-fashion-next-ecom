import React from "react";
import styles from "./Color.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartFormActions } from "../../store/cart-form";

const Size = (props) => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.cartFormReducer.size);
  const highlightOnChange = () => {
    dispatch(cartFormActions.changeSize(props.size));
    props.changeErrorState();
  };
  return (
    <li className={styles.colorList}>
      <label className={styles.colorLabel}>
        <input
          type="radio"
          onClick={highlightOnChange}
          className={styles.color}
          value={props.size}
        />
        <span
          style={{
            background: "white",
            display: "grid",
            placeItems: "center",
          }}
          className={`${styles.swatch} ${
            props.size === size && styles.swatchHighlight
          }`}
        >
          <strong>
          {`${props.size && props.size.toUpperCase()}`}</strong>
        </span>
      </label>
    </li>
  );
};

export default Size;
