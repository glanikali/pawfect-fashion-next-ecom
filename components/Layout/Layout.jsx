import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className={classes.content}>{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
