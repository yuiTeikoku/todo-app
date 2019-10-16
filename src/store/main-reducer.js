const initState = {
    products: null,
    user: null,
    cart: []
};

const mainReducer = (state = initState, action) => {
    switch(action.type) {
        case "SET_PRODUCTS": 
            return {
                ...state, 
                products: action.products
            };
        case "SET_USER": 
            return {
                ...state, 
                user: action.user
            };    
        case "SET_CART": 
            return {
                ...state, 
                cart: action.cart
            }; 
        case "REMOVE_FROM_CART": 
            console.log(action)
            return {
                ...state, 
                cart: state.cart.filter(item => item._id !== action.itemId)
            }    
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.cartItem]
            }
        default:
            return state;
    }
}
export default mainReducer;