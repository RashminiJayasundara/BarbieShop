import { createContext, useReducer } from "react";

export const Store=createContext();
const initialState={
    userInfo:localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):null,
    cart:{
    cartItems:localStorage.getItem('CartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    shippingAddress:localStorage.getItem('shippingDetails')?JSON.parse(localStorage.getItem('shippingDetails')):{},
    paymentmethod:localStorage.getItem('paymentMethod')?localStorage.getItem('paymentMethod'):'',
},
    Category_data:{
        categories:localStorage.getItem('categoryData')?JSON.parse(localStorage.getItem('categoryData')):[],

    }

}
function reducer(state,action){
    console.log('first')
    switch(action.type){
        case 'CART_ADD_ITEM':
            const newItem=action.payload;
            const existItem=state.cart.cartItems.find(
                (item)=>item._id === newItem._id
            );
            const cartItems=existItem? state.cart.cartItems.map((item)=>
            item._id===existItem._id? newItem:item):[...state.cart.cartItems,newItem];
            localStorage.setItem('CartItems',JSON.stringify(cartItems))
            return {...state,cart:{...state.cart,cartItems}}
        case 'CART_REMOVE_ITEM':
            const cartItem=state.cart.cartItems.filter((item)=>item._id !== action.payload._id);
            console.log(cartItem)
            return {...state,cart:{...state.cart,cartItems:cartItem}};
        case 'ADD_CATEGORY_DATA': 
           localStorage.setItem('categoryData',JSON.stringify(action.payload))
            return {...state,Category_data:{...state.Category_data,categories:action.payload}}
        case 'USER_SIGNIN':
            return {...state,userInfo:action.payload}
        case 'USER_SIGN_OUT':
            return{...state,userInfo:null,cart:{cartItems:[]}};
        case 'SAVE_SHIPPING_ADDRESS':
            return{...state,cart:{...state.cart,shippingAddress:action.payload}};
        case 'SAVE_PAYMENT_METHOD':
            return{...state,cart:{...state.cart,paymentmethod:action.payload}};
        default:
            return state;
    }
}
export function StoreProvider(props){
    const [state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}