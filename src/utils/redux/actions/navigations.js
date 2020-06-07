import {loadNavigations} from "../../resources/navigations";

export const LOAD_NAVIGATION = 'LOAD_NAVIGATION';
export const LOAD_NAVIGATION_ERR = 'LOAD_NAVIGATION_ERR';
export const LOAD_NAVIGATION_SUCCESS = 'LOAD_NAVIGATION_SUCCESS';

export const loadNavigationsAction = () => (dispatch) =>{
    dispatch({type: LOAD_NAVIGATION});
    return new Promise( (resolve, reject) => {
        loadNavigations().then(
            (response) => {
                dispatch({type: LOAD_NAVIGATION_SUCCESS, payload: response});

            },
            (error)=>{
                dispatch({type: LOAD_NAVIGATION_ERR})
            }
        )
    })
}