import axios from 'axios'
import { register } from '../../serviceWorker'

const API_URL = '/api/users/'

const registerUser = async (userData) => {
    const resp = await axios.post(API_URL, userData)
    if(resp.data){
        localStorage.setItem('user', JSON.stringify(resp.data))
    }
    return resp.data
}


const loginUser = async (userData) => {
    const resp = await axios.post(API_URL + 'login', userData)
    if(resp.data){
        localStorage.setItem('user', JSON.stringify(resp.data))
    }
    return resp.data
}

const logoutUser = async () => {
    localStorage.removeItem('user')
}

const authService = {
    registerUser,
    loginUser,
    logoutUser
}

export default authService