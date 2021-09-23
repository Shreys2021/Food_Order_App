import { useContext } from 'react';
import classes from './MealItem.module.css'
import MealItemfrom from './MealItemForm'
import CartContext from '../../../Store/cart-context'

const MealItem = (props) => {

    const cartctx = useContext(CartContext)

    const price = `$${props.price.toFixed(2)}`

    const addToCartHandler = amount => {

        cartctx.addItem({

            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })

    }


    return (
        <li classes={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div classes={classes.description}>{props.description}</div>
                <div classes={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemfrom onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
}

export default MealItem;