import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item, idx) => (
          <CartItem item={item} key={idx} id={idx}/>
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
