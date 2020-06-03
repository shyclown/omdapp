import config from './config';
import axios from 'axios';

// import {auth} from 'utils/auth';

const axiosConfig = {
    baseURL: 'http://api.react.localhost/', //config.API_ROOT,
    headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
    //headers: {'Authorisation' : 'aaa' }
};

console.log(axiosConfig);


export const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
(config) => {


   // const token = auth.getAccessToken();
    //if (token) {
    //    config.headers['Authorization'] = `Bearer ${token}`;
   // }
    return config;
},
(error) => {
    return Promise.reject(error);

});

axiosInstance.interceptors.response.use(
    (response)=>{
    /* store new token if issued */

    /*if (
        response.data &&
        response.data.token
    ) {
        auth.setAccessToken(response.data.token);
        console.info('New token was issued!');
    }
    */
    return response.data;
});

export default axiosInstance;