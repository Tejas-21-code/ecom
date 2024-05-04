import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cardCtx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cardCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <div className={classes.meal}>
      <div className={classes.center}>
        <div className={classes.flex}>
          <img
            src={props.image}
            alt="Girl in a jacket"
            width="100"
            height="100"
          />{" "}
          <div>
            <MealItemForm onAddToCart={addToCartHandler} />
          </div>
        </div>
        <h3>{props.name}</h3>
        <div className={classes.description}> {props.description}... </div>
        <div className={classes.price}> {price} </div>
      </div>
    </div>
  );
};

export default MealItem;
