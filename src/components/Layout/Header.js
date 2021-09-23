import React from 'react';

import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = props => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src="https://thumbs.dreamstime.com/b/meat-cheese-appetizers-antipasti-catering-platter-different-meat-cheese-products-meat-cheese-appetizers-180282254.jpg" alt="A Table full of delecious food!!" />
            </div>
        </React.Fragment>
    );
};

export default Header;