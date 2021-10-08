import React, {useEffect, useState} from "react";
import styles from './MobileMenuLinks.module.scss'
import Link from "next/link";
import Button from "../UI/Button";
import ShoppingCartIcon from "../../assets/UI/ShoppingCartIcon";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { uiSliceActions } from "../../store/ui";

const MobileMenuLinks = (props) => {
    const [cartAnimation, setCartAnimation] = useState(false);
  const dispatch = useDispatch()
    const menuState = useSelector(state=> state.uiReducer.mobileMenu.isVisible)
    const router = useRouter();
    const cart = useSelector((state) => state.cartReducer.cart);
    let classes;
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
      const handleClick = () =>{
          dispatch(uiSliceActions.changeMenuStatus())
      }
  return (
    <>
      {menuState && (
        <nav className={`${styles.dropdownContainer}`}>
          <ul className={styles.listContainer}>
            <li onClick={handleClick} className={styles.list}>
              <Link href="/">Make A Bandana</Link>
            </li>
            <li onClick={handleClick} className={styles.list}>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li onClick={handleClick} className={styles.list}>
              <Button onClick={onCartClick}>
                <ShoppingCartIcon animation={cartAnimation} />
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default MobileMenuLinks;
