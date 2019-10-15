const setProducts = (products) => ({type: "SET_PRODUCTS", products});
const loadProductsAndSetToStore = () => dispatch => {
    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        dispatch(setProducts(data));
    })
    .catch(() => {
        console.log("Ошибка при загрузке данных");
    });
}

const setUser = (user) => ({type: "SET_USER", user});
const loadUserBySessionAndSetToStore = () => dispatch => {
    const session = localStorage.getItem('session');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session })
    };

    fetch("http://localhost:3000/api/getUserBySession", requestOptions)
    .then(res => res.text())
    .then(data => {
        const jsonData = JSON.parse(data);
        dispatch(setUser(jsonData));
    })
    .catch(() => {
        console.log("Ошибка при загрузке данных");
    });
}

const removeFromCart = (prodId) => ({type: "REMOVE_FROM_CART", prodId});
const addToCart = (product) => ({type: "ADD_TO_CART", product});

export {
    loadProductsAndSetToStore, 
    loadUserBySessionAndSetToStore,
    removeFromCart,
    addToCart
}