import React from 'react';

import CartList from '../../containers/cart-list';
import Pagination from '../../containers/pagination';

const CartPage = () => (
    <div className="row">
        <Pagination targetFilter="cart" />
        <CartList />
    </div> 
)

export default CartPage;