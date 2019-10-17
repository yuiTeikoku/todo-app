const initState = {
    products: null,
    user: null,
    cart: [],
    filter: {
        products: {
            pagination: {
                show: 5,
                currPage: 0
            },
            category: []
        },

        cart: {
            pagination: {
                show: 5,
                currPage: 0
            },
            category: []
        }
    }
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
            return {
                ...state, 
                cart: state.cart.filter(item => item._id !== action.itemId)
            }    
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.cartItem]
            }
        case "CHANGE_CURR_PAGE":
            let newFilter = {...state.filter}
            newFilter[action.props.target].pagination.currPage = action.props.nextPage;
                        
            return {
                ...state,
                filter: { ...newFilter }
            }
        default:
            return state;
    }
}
export default mainReducer;