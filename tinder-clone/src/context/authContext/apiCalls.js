import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, logout} from './AuthActions';

export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'https://clone-mern-tinder.vercel.app/api'

// Login
export const login = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${apiUrl}/auth/login`, user)
        if(res.data.success){
            localStorage.setItem("user", res.data.accessToken)
        }
        dispatch(loginSuccess(res.data.accessToken))
    } catch (error) {
        dispatch(loginFailure())
    }
}

// Logout
export const logoutSuccess = (dispatch) => {
    dispatch(logout())
}