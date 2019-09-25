const initState = {
    products: null
};

const mainReducer = (state = initState, action) => {
    switch(action.type) {
        case "SET_PRODUCTS": 
            return {
                ...state, 
                ...{products: action.products}
            };
        case "REMOVE_PRODUCT": 
            return {
                ...state, 
                ...{products: state.products.filter(item => item.id !== action.prodId)}
            }    
        case "ADD_PRODUCT":
            return {
                ...state,
                ...{products: [...state.products, action.product]}
            }
        default:
            return state;
    }
}
export default mainReducer;