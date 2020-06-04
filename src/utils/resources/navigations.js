import axios from './../api'
export const loadNavigations = () => {
    console.log('navigate')
    return axios.get('/client/navigation')
}