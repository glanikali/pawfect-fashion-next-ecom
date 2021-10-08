import React from "react";
import styles from "./Hamburger.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../../store/ui";

const Hamburger = (props) => {
  let classes;
  const dispatch = useDispatch();
  const menuState = useSelector(
    (state) => state.uiReducer.mobileMenu.isVisible
  );
  console.log(menuState);
  if (menuState) {
    classes = `${styles.burgerTop}`;
  } else {
    classes = "";
  }

  const handleClick = () => {
    dispatch(uiSliceActions.changeMenuStatus());
  };

  return (
    <>
    {/* <div onClick={handleClick}>
      <div className={classes}></div>
    </div> */}

    <div onClick={handleClick} className={styles.burgerContainer}>
      <div className={`${menuState ? styles.burgerTop : ""}`}></div>
      <div className={`${menuState ? styles.burgerMiddle : ""}`}></div>
      <div className={`${menuState ? styles.burgerBottom : ""}`}></div>
    </div>
    </>
  );
};

export default Hamburger;
