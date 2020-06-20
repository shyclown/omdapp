import axios from './api';

export const login = (data) => {
    return axios.post('local/auth/login', data);
};

export const logout = (data) => {
    return axios.get('local/auth/logout', data);
};

export const register = (data) => {
    return axios.post('local/auth/register',data);
};

export const resetPassword = (data) => {
    return axios.post('local/auth/reset',data);
};
export const requestPassword = (data) => {
    return axios.post('local/auth/reset',data);
};

export const check = () => {
    return axios.get('local/auth/check');
};

export const getUserToken = () => {
    localStorage.getItem('token');
};

export const auth = {
    parsePayloadFromToken: (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    },

    getAccessToken: () => {
        return window.localStorage.getItem('src-token');
    },

    setAccessToken: (token) => {
        return window.localStorage.setItem('src-token', token);
    },

    removeAccessToken: () => {
        return window.localStorage.removeItem('src-token');
    }
};