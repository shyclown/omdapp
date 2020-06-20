
import {
    LOAD_ITEM,
    LOAD_ITEM_ERR,
    LOAD_ITEM_SUCCESS,
} from "../actions/items";


const initialState = {
    items: {},
    loadingItems: [],
};

export default (state = initialState, action) => {

    switch (action.type) {

        case LOAD_ITEM:
            return {
                ...state,
                loadingItems: [
                    ...state.loadingItems,
                    action.payload.id
                ],
            };

        case LOAD_ITEM_SUCCESS: {

            console.log(action);
            const item = action.payload;

            return {
                ...state,
                items: {
                    ...state.items,
                    [item.id]: item
                },
                loadingItems: state.loadingItems.filter(i => i !== item.id),
            };
        }
        case LOAD_ITEM_ERR:
            return {
                ...state,
                ...action.payload
            };

        default: return state;
    }
};