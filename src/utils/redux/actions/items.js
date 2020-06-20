import {loadItem} from "../../resources/items";

export const LOAD_ITEM = 'LOAD_ITEM';
export const LOAD_ITEM_ERR = 'LOAD_ITEM_ERR';
export const LOAD_ITEM_SUCCESS = 'LOAD_ITEM_SUCCESS';

export const loadItemAction = (id) => (dispatch) => {

    return new Promise( (resolve, reject) => {
        dispatch({type: LOAD_ITEM, payload: id});
        loadItem(id).then(
            (response) => {
                console.log('Response: ', response);
                dispatch({type: LOAD_ITEM_SUCCESS, payload: response});
                resolve(response);
            },
            (error)=>{
                dispatch({type: LOAD_ITEM_ERR});
                reject(error);
            }
        )
    })

}

