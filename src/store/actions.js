import { DataLoader } from '../utils';

const setProducts = (products) => ({type: "SET_PRODUCTS", products: products});

const loadProductsAndSetToStore = () => dispatch => {
    const loader = new DataLoader();
    loader.getTestData().then(data => {
        dispatch(setProducts(data));
    });
}

const removeProduct = (prodId) => ({type: "REMOVE_PRODUCT", prodId});
const addProduct = (product) => ({type: "ADD_PRODUCT", product});

export {
    loadProductsAndSetToStore, 
    removeProduct,
    addProduct
}