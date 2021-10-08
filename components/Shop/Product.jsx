import React from "react";
import Bandana from "../../assets/UI/Bandana";
import { useSelector } from "react-redux";

const Product = (props) => {
  const { customText, mediaURL } = useSelector(
    (state) => state.cartFormReducer
  );

  return <Bandana id={"static"} customText={customText} mediaURL={mediaURL} />;
};

export default Product;
