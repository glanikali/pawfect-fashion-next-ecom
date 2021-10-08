import React, { useEffect, useState } from "react";

import styles from "./MobileMenu.module.scss";
import Link from "next/link";
import Button from "../UI/Button";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "../../assets/UI/ShoppingCartIcon";
import Hamburger from "../../assets/UI/Hamburger";

const MobileMenu = (props) => {
  const [cartAnimation, setCartAnimation] = useState(false);

  const router = useRouter();
  const cart = useSelector((state) => state.cartReducer.cart);

  const onCartClick = () => {
    router.replace("/cart");
  };

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }

    setCartAnimation(true);

    const timer = setTimeout(() => {
      setCartAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cart]);

 

  return (
    <div className={styles.mobileMenu}>
      <Hamburger />
    </div>
  );
};

export default MobileMenu;
