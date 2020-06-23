import {loadNavigations} from "../../resources/navigations";

export const LOAD_NAVIGATION = 'LOAD_NAVIGATION';
export const LOAD_NAVIGATION_ERR = 'LOAD_NAVIGATION_ERR';
export const LOAD_NAVIGATION_SUCCESS = 'LOAD_NAVIGATION_SUCCESS';

export const loadNavigationsAction = () => (dispatch, getState) =>{

    if (!getState().navigations.loadingNavigations) {
            dispatch({type: LOAD_NAVIGATION});
    return new Promise( (resolve, reject) => {
            loadNavigations().then(
                (response) => {
                    resolve(response);
                    dispatch({type: LOAD_NAVIGATION_SUCCESS, payload: response});

                },
                (error)=>{
                    reject(error);
                    dispatch({type: LOAD_NAVIGATION_ERR})
                }
            )
        })
    }
}