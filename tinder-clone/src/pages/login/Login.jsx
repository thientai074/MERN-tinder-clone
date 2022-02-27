import './Login.css';
import { Link } from 'react-router-dom';
import {useState, useContext} from 'react';
import { AuthContext} from '../../context/authContext/AuthContext'
import { login } from '../../context/authContext/apiCalls';

const Login = () => {
    const [username, setUsername]= useState("")
    const [password, setPassword] = useState("")
    const {isFetching, dispatch } = useContext(AuthContext)    

    const handleLogin = (e) => {
        e.preventDefault();
        login({username, password}, dispatch)
    }
            
        
    return (
        <div className="login">
        <div className="container">
            <h2>MÀN HÌNH ĐĂNG NHẬP</h2>
            <h1>SWIPE RIGHT</h1>
            <div className="input">
                <input 
                    type="text" 
                    placeholder="Username"
                    name='username'
                    onChange={(e)=> setUsername(e.target.value)}
                    required />
                <input 
                    type="password" 
                    placeholder="Password"
                    name='password'
                    onChange={(e)=>setPassword(e.target.value)}
                    required />                
                <button 
                    type='submit'
                    className="loginButton" 
                    onClick={handleLogin}
                    disabled={isFetching}>Đăng nhập</button>
                <p>Bạn chưa có tài khoản ư ?
                    <Link to="/register">
                        <button className="registerButton">Đăng ký</button>
                    </Link>
                </p>  
            </div>
        </div>
    </div>
    )  
}

export default Login