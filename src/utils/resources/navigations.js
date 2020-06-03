import axios from './../api'
export const loadNavigaitons = () => {
    console.log('navigate')
    return axios.get('/client/navigation')
}