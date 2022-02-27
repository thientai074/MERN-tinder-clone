import './Register.css';
import { Link, useHistory } from 'react-router-dom'
import { useState} from 'react';
import axios from 'axios';
import { apiUrl } from '../../context/authContext/apiCalls';

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const handleRegister = async (e) => {
        
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/auth/register`, {username, password})
            history.push('/login')
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div className="register">
        <div className="container">
            <h2>MÀN HÌNH ĐĂNG KÝ</h2>
            <h1>SWIPE RIGHT</h1>
            <div className="input">
                <input 
                    type="text" 
                    placeholder="Username"
                    onChange={(e)=> setUsername(e.target.value)}
                    required />
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={(e)=> setPassword(e.target.value)}
                    required />                
                <button 
                    className="registerButton"
                    onClick={handleRegister}
                >Tạo tài khoản</button>
                <p>Bạn có tài khoản rồi à ?
                    <Link to="/login">
                        <button className="loginButton">Đăng nhập</button>
                    </Link>
                </p>  
            </div>
        </div>
    </div>
    )  

}

export default Register