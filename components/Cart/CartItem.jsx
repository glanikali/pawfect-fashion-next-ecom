import React,{useState} from "react";
import Bandana from "../../assets/UI/Bandana";
import Card from "../UI/Card";
import styles from "./CartItem.module.scss";
import Button from "../UI/Button";
import { useSelector, useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cart";

const CartItem = (props) => {
  

  const [inputValue,setInputValue] = useState(props.customText);
  const products = useSelector((state) => state.productsReducer.products);
  const cart = useSelector(state => state.cartReducer.cart)

  const size = useSelector(state => state.productsReducer.size);
  const filteredSize = size.filter(el => el !== props.item.size)
  
  const color = products.map(el=> el.color)
  const filteredColor = color.filter(el=> el !== props.item.pattern)


  const  dispatch = useDispatch();
  

  const patternChange = (e) =>{
    const newPattern = e.target.value;
    dispatch(cartSliceActions.updatePattern({
      id: props.id,
      pattern: newPattern,
      products: products
    }))
  }

  const sizeChange = (e)=>{
    const newSize = e.target.value;
    dispatch(cartSliceActions.updateSize({
      id: props.id,
      size: newSize
    }))
  }

  
  const customTextChange = (e) =>{
    setInputValue(e.target.value);
    dispatch(cartSliceActions.updateCustomText({
      text: e.target.value,
      id: props.id,
    }))
  }
  const removeFromCart = (e) =>{
    
    dispatch(cartSliceActions.removeFromCart({
      id: props.id,
    }))
  }

  return (
    <Card className={styles.cartItemContainer} style={{ width: "100%" }}>
      <div className={styles.bandana}>
        <Bandana
          mediaURL={props.mediaURL}
          customText={props.customText}
          id={props.id}
          key={props.id}
        />
      </div>
      <div className={styles.cartProductInfo}>
        <h3>
          Pattern: 
          <span className={styles.highlight}>
            <select className={styles.patternSelector} onChange={patternChange.bind(this)}>
              <option value={props.item.pattern}>{props.item.pattern}</option>
              {filteredColor.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </span>
        </h3>
        <h3>
          Size: 
          <span className={styles.highlight}>
            <select onChange={sizeChange.bind(this)} className={styles.patternSelector}>
              <option value={ props.item.size}>{ props.item.size}</option>
              {filteredSize.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </span>
        </h3>
        <h3>
          Custom Text:
          <span className={styles.highlight}>
            <input style={{width: "50%"}}maxLength="8" autoFocus value={inputValue} onChange={customTextChange.bind(this)} className={styles.patternSelector} />    
          </span>
        </h3>
        <h3>Price: $18</h3>
      </div>
      <div className={styles.removeFromCart}>
        <Button className={styles.removeFromCartButton}type="button" onClick={removeFromCart}>X</Button>
      </div>
    </Card>
  );
};

export default CartItem;
