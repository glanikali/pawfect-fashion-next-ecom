import React from "react";
import Card from "../UI/Card";
import Product from "./Product";
import Form from "./Form";
import styles from "./Shop.module.scss";
const Shop = (props) => {
  return (
    <div className={styles.shopContainer}>
      <Card className={styles.formCard}>
        <Product />
      </Card>
      <Card className={styles.formCard}>
        <Form />
      </Card>
    </div>
  );
};

export default Shop;
