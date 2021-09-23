import { Fragment } from 'react';
import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = props => {

    const [isChechOut, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAdHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const orderItem = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {

        setIsSubmitting(true);
        await fetch('https://food-order-app-d01af-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>{cartCtx.items.map((items) => (
            <CartItem key={items.id} name={items.name} amount={items.amount} price={items.price} onRemove={cartItemRemoveHandler.bind(null, items.id)} onAdd={cartItemAdHandler.bind(null, items)} />
        ))}
        </ul>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isChechOut && hasItems && <Checkout onconfirm={submitOrderHandler} onCancel={props.onClose} />}
            <div className={classes.actions}>
                {!isChechOut && <button className={classes['button--alt']} onClick={props.onClose}>Close</button>}
                {hasItems && !isChechOut && <button className={classes.button} onClick={orderItem}>Order</button>}
            </div>
        </Fragment>
    );

    const isSubmittingcontent = <p>Placing Order...</p>;
    const didSubmitting = <p>Succesfully Placed Data</p>
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingcontent}
            {!isSubmitting && didSubmit && didSubmitting}

        </Modal>
    );
};

export default Cart;