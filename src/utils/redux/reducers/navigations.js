
import {
    LOAD_NAVIGATION,
    LOAD_NAVIGATION_ERR,
    LOAD_NAVIGATION_SUCCESS,
} from "../actions/navigations";


const initialState = {
    navigations: {},
    loadingNavigations: [],
};

export default (state = initialState, action) => {

    switch (action.type) {

        case LOAD_NAVIGATION:
            return {
                ...state,
                loadingNavigations: [
                    ...state.loadingItems,
                    action.payload.id
                ],
            };

        case LOAD_NAVIGATION_SUCCESS: {

            const navigation = action.payload.data;

            return {
                ...state,
                navigations: {
                    ...state.navigations,
                    [navigation.name]: navigation
                },
                loadingNavigations: state.loadingNavigations.filter(i => i !== navigation.id),
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