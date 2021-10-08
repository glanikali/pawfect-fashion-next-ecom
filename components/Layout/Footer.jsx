import React from "react";
import styles from "./Footer.module.scss";

const Footer = (props) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footerContainer}>
      <p>© Pawfect Fashion {currentYear}</p>
    </footer>
  );
};

export default Footer;
