
import axios from "./../api";
import config from "./../config/index";




export const getFileSrc = (file_id) => {
    return '/client/files/blob/'+file_id;
};


export const getImageSrc = (file_id, size) => {

    let useSize = size || 250;
    return config.API_ROOT+'client/files/blob/image/'+useSize+'/'+file_id;
};