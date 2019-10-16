const setProducts = (products) => ({type: "SET_PRODUCTS", products});
const loadProductsAndSetToStore = () => dispatch => {
    return fetch("/api/products")
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

    return fetch("/api/getUserBySession", requestOptions)
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

const setCart = cart => ({type: "SET_CART", cart});
const loadCartByUserIdAndSetToStore = (userId) => dispatch => {
    return fetch(`/api/getCartByUser/${userId}`)
    .then(res => res.json())
    .then(data => {
        dispatch(setCart(data)); 
    })
    .catch(err => {
        console.error("Ошибка при загрузке данных: ", err);
    });
}

const removeFromCart = itemId => ({type: "REMOVE_FROM_CART", itemId});
const addToCart = cartItem => ({type: "ADD_TO_CART", cartItem});

export {
    loadProductsAndSetToStore, 
    loadUserBySessionAndSetToStore,
    loadCartByUserIdAndSetToStore,
    removeFromCart,
    addToCart
}