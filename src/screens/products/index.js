import React from 'react';

import ProductsList from '../../containers/products-list';
import Pagination from '../../containers/pagination';

const ProductsPage = () => (
    <div className="row">
        <Pagination targetFilter="products" />
        <ProductsList />
    </div> 
);

export default ProductsPage;