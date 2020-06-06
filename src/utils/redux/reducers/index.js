import {combineReducers} from "redux";

import navigations from "./navigations";
import items from "./items";

export default combineReducers({
    items,
    navigations,
});