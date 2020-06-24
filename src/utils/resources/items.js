import axios from './../api';

export const loadItem = (id) => {
    return axios.get('/client/item/'+id);
}

export const loadItemDesc = (id) => {
    return axios.get('/client/itemDesc/'+id);
}