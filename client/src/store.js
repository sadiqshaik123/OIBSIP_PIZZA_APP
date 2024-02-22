import {combineReducers,compose} from 'redux'
import {legacy_createStore as createStore, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'

import {getAllPizzasReducer, addPizzaReducer} from "./reducers/pizzaReducers"
import { registerUserReducer } from "./reducers/userReducers"
import { cartReducer } from "./reducers/cartReducers";
import { loginUserReducer, getAllUsersReducer } from './reducers/userReducers'
import { placeOrderReducer,getUserOrdersReducer,allUserOrdersReducer } from './reducers/orderReducer'

const finalReducer = combineReducers({
    getAllPizzasReducer : getAllPizzasReducer,
    cartReducer: cartReducer,
    registerUserReducer : registerUserReducer,
    loginUserReducer: loginUserReducer,
    placeOrderReducer:placeOrderReducer,
    getUserOrdersReducer: getUserOrdersReducer,
    addPizzaReducer:addPizzaReducer,
    allUserOrdersReducer:allUserOrdersReducer,
    getAllUsersReducer : getAllUsersReducer,



})
const cartItems =localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): []
const currentUser = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null;
const initialState={
    cartReducer: {
        cartItems: cartItems
    },
    loginUserReducer:{
        currentUser: currentUser
    }
}


const composeEnhancers = (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' )?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;
const store = createStore(finalReducer, initialState , composeEnhancers(applyMiddleware(thunk)))  

export default store