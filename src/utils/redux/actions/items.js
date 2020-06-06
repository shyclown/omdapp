import {loadItem} from "../../resources/items";

export const LOAD_ITEM = 'LOAD_ITEM';
export const LOAD_ITEM_ERR = 'LOAD_ITEM_ERR';
export const LOAD_ITEM_SUCCESS = 'LOAD_ITEM_SUCCESS';

export const loadItemAction = () => {
    return new Promise( (resolve, reject) => (dispatch) =>{
        dispatch({type: LOAD_ITEM});
        loadItem().then(
            (response) => {
                dispatch({type: LOAD_ITEM_SUCCESS});

            },
            (error)=>{
                dispatch({type: LOAD_ITEM_ERR})
            }
        )

    })
}

