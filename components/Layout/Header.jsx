import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import Button from "../UI/Button";
import { useRouter } from "next/router";
import ShopingCartIcon from "../../assets/UI/ShoppingCartIcon.jsx";
import { useSelector } from "react-redux";
import MobileMenu from './MobileMenu'
import MobileMenuLinks from "./MobileMenuLinks";
import Logo from '../../assets/UI/pawfect-fashion-log.png'
import Image from 'next/image'

const Header = (props) => {
  const [cartAnimation, setCartAnimation] = useState(false);

  const router = useRouter();
  const cart = useSelector((state) => state.cartReducer.cart);

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

  const onCartClick = () => {
    router.replace("/cart");
  };

  
  return (
    <>
    <div className={styles.herobarContainer}><p className={styles.heroBarText}>🎁 FREE SHIPPING FOR TORONTO & GTA 🎁</p></div>
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link href="/">
          <Image src={Logo}  layout='responsive'alt="pawfect fashion logo"/></Link>
        </div>
        <MobileMenu  />
        <nav className={styles.navContainer}>
          <ul className={styles.navLinks}>
            <li>
              <Link className={styles.link} href="/">
                Make A Bandana
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/contact-us">
                Contact Us
              </Link>
            </li>
            <li>
              <Button onClick={onCartClick}>
                <ShopingCartIcon animation={cartAnimation} />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <MobileMenuLinks  />
    </>
  );
};

export default Header;
