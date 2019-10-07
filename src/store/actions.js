import { DataLoader } from '../utils';

const setProducts = (products) => ({type: "SET_PRODUCTS", products: products});

const loader = new DataLoader();
const loadProductsAndSetToStore = () => dispatch => {
    loader.getData("http://localhost:3000/api/products")
    .then(data => {
        dispatch(setProducts(data));
    })
    .catch((...err) => {
        console.log("Ошибка при загрузке данных");
    });
}

const removeFromCart = (prodId) => ({type: "REMOVE_FROM_CART", prodId});
const addToCart = (product) => ({type: "ADD_TO_CART", product});

export {
    loadProductsAndSetToStore, 
    removeFromCart,
    addToCart
}