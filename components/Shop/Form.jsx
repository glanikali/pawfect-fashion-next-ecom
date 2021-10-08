import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Color from "./Color";
import styles from "./Form.module.scss";
import Size from "./Size";
import { cartFormActions } from "../../store/cart-form";
import Button from "../UI/Button";
import { cartSliceActions } from "../../store/cart";
import { useRouter } from "next/router";

const Form = (props) => {
  const router = useRouter();

  // error checking
  const [colorError, setColorError] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  //redux states
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);
  const size = useSelector((state) => state.productsReducer.size);
  const customText = useSelector((state) => state.cartFormReducer.customText);

  const {
    pattern,
    size: sizeInput,
    mediaURL,
  } = useSelector((state) => state.cartFormReducer);

  //revalidation
  const revalColorStatus = () => {
    setColorError(false);
  };
  const revalSizeStatus = () => {
    setSizeError(false);
  };
  // handle submit
  const inputOnChange = (e) => {
    dispatch(cartFormActions.changeText(e.target.value));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!pattern) {
      setColorError(true);
    }
    if (!sizeInput) {
      setSizeError(true);
    }

    if (pattern && sizeInput) {
      dispatch(
        cartSliceActions.addToCart({
          pattern,
          size: sizeInput,
          customText,
          mediaURL,
          id: Math.random(),
        })
      );
      dispatch(cartFormActions.clearForm());
      router.push("/cart");
    }
  };

  return (
    <div className={styles.formCardContainer}>
      <h1>BUILD A BANDANA</h1>
      <p>
        <strong>
        Build your own bandana from scratch. Choose your pattern, size and
        extras!</strong>
      </p>
      <div>
        <h3>Price:</h3>
        <p><strong>$18 CAD</strong></p>
      </div>

      <form className={styles.innerFormContainer} action="submit">
        <h3>Choose a pattern/color:</h3>
        {colorError && <p style={{ color: "red" }}>Please Choose A Color</p>}
        <ul className={styles.listContainerColor}>
          {products.map((el) => (
            <Color
              key={el.id}
              changeErrorState={revalColorStatus}
              color={el.color}
              id={el.id}
              mediaURL={el.img}
            />
          ))}
        </ul>

        <h3>Choose a size:</h3>
        {sizeError && <p style={{ color: "red" }}>Please Choose A Size</p>}
        <ul className={styles.listContainer}>
          {size.map((el) => (
            <Size changeErrorState={revalSizeStatus} key={el} size={el} />
          ))}
        </ul>
        <h3>Add Custom Text</h3>
        <input
          style={{ height: "2em" }}
          maxLength="8"
          className={styles.customTextInput}
          onChange={inputOnChange.bind(this)}
          value={customText}
          type="text"
        />
        <Button
          className={styles.addToCartButton}
          onClick={submitForm.bind(this)}
          type="submit"
        >
          Add To Cart
        </Button>
      </form>
    </div>
  );
};

export default Form;
