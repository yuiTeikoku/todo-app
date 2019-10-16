const setProducts = (products) => ({type: "SET_PRODUCTS", products});
const loadProductsAndSetToStore = () => dispatch => {
    return fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        dispatch(setProducts(data));
    })
    .catch(err => {
        console.error("Ошибка при загрузке данных: ", err);
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

    return fetch("http://localhost:3000/api/getUserBySession", requestOptions)
    .then(res => res.text())
    .then(data => {
        const _id = JSON.parse(data);
        if (typeof _id === "string")
            return dispatch(setUser({ _id }));
        
        dispatch(setUser({})); 
    })
    .catch(err => {
        console.error("Ошибка при загрузке данных: ", err);
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