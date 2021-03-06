import { Fragment, useState, useContext } from "react";

import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CartContext from "../../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "../../assets/scss/layout/_cart.module.scss";

const Cart = (props) => {
   const [isCheckout, setIsCheckout] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [didSubmit, setDidSubmit] = useState(false);
   const cartCtx = useContext(CartContext);

   const totalAmount = `${cartCtx.totalAmount.toFixed(2)}€`;
   const hasItems = cartCtx.items.length > 0;

   const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
   };

   const cartItemAddHandler = (item) => {
      cartCtx.addItem(item);
   };

   const orderHandler = () => {
      setIsCheckout(true);
   };

   const clearCart = () => {
      cartCtx.clearCart();
   };

   const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);

      await fetch(
         "https://react--clone-d9242-default-rtdb.firebaseio.com/orders.json",
         {
            method: "POST",
            body: JSON.stringify({
               user: userData,
               orderedItems: cartCtx.items,
            }),
         }
      );

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
   };

   const cartItems = (
      <ul>
         {cartCtx.items.map((item) => (
            <CartItem
               key={item.id}
               id={item.id}
               name={item.name}
               image={item.image}
               amount={item.amount}
               price={item.price}
               onRemove={cartItemRemoveHandler.bind(null, item.id)}
               onAdd={cartItemAddHandler.bind(null, item)}
            />
         ))}
      </ul>
   );

   const modalActions = (
      <Fragment>
         <div className={classes.buttons_container}>
            <button className={classes.x_icon} onClick={props.onClose}>
               <FontAwesomeIcon icon="fa-xmark" />
            </button>
            {hasItems && (
               <Fragment>
                  <button className={classes.orange_btn} onClick={clearCart}>
                     Clear cart
                  </button>
                  <button className={`${classes.orange_btn} btn-blue`} onClick={orderHandler}>
                     Order
                  </button>
               </Fragment>
            )}
         </div>
         {!hasItems && <h3 className="p_10">Empty cart</h3>}
      </Fragment>
   );

   const cartModalContent = (
      <Fragment>
         {!isCheckout && modalActions}
         {isCheckout && (
            <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
         )}
         {cartItems}
         {hasItems && (
            <div className={classes.amount_container}>
               <span>TOTAL AMOUNT: </span>
               <span className={classes.amount}>{totalAmount}</span>
            </div>
         )}
      </Fragment>
   );

   const isSubmittingModalContent = <p className="p_10">Sending order data...</p>;

   const didSubmitModalContent = (
      <div className="p_10">
         <p>Successfully sent the order!</p>
         <div className={classes.buttons_container}>
            <button className={classes.orange_btn} onClick={props.onClose}>Close</button>
         </div>
      </div>
   );

   return (
      <div className={classes.cart}>
         {!isSubmitting && !didSubmit && cartModalContent}
         {isSubmitting && isSubmittingModalContent}
         {!isSubmitting && didSubmit && didSubmitModalContent}
      </div>
   );
};

export default Cart;
