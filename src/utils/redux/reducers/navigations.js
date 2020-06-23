
import {
    LOAD_NAVIGATION,
    LOAD_NAVIGATION_ERR,
    LOAD_NAVIGATION_SUCCESS,
} from "../actions/navigations";


const initialState = {
    navigations: [],
    loadingNavigations: false,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case LOAD_NAVIGATION:
            return {
                ...state,
                loadingNavigations: true,
            };

        case LOAD_NAVIGATION_SUCCESS: {

            const navigations = action.payload;

            return {
                ...state,
                navigations: navigations,
                loadingNavigations: false,
            };
        }
        case LOAD_NAVIGATION_ERR:
            return {
                ...state,
                ...action.payload
            };

        default: return state;
    }
};