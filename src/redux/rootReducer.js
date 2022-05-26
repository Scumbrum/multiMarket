import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import productsReducer from "./productsReducer";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";
export default combineReducers({
    currencyReducer,
    productsReducer,
    categoryReducer,
    cartReducer
})