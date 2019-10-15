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
        case "REMOVE_FROM_CART": 
            return {
                ...state, 
                products: state.cart.filter(item => item.id !== action.prodId)
            }    
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.product]
            }
        default:
            return state;
    }
}
export default mainReducer;