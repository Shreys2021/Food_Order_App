import { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css'
import CartContext from '../../Store/cart-context'

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);
    console.log("hi")
    const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
        console.log("hi")
        return curNumber + item.amount;
    }, 0)
    console.log(numberOfCartItem);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>your Cart</span>
            <span className={classes.badge}>{numberOfCartItem}</span>
        </button>
    );
}

export default HeaderCartButton;