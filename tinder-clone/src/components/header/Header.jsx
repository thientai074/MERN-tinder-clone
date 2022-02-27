import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import './Header.css';
import {AuthContext} from '../../context/authContext/AuthContext';
import {useContext} from 'react';
import {logoutSuccess} from '../../context/authContext/apiCalls';
import {useHistory} from 'react-router-dom';
const Header = () => {
    const history = useHistory()
    const {dispatch} = useContext(AuthContext)
    

    const handleLogout = () => {
        logoutSuccess(dispatch);
        history.push("/login")

    }    
    return (
        <div className="header">     
            <IconButton >
                <PersonIcon fontSize="large" className="header__icon" className="personIcon" />
            </IconButton>

            <img 
                className="header__logo"
                src="https://th.bing.com/th/id/OIP.66m_SqV5aESg-P0KFtExyQHaEK?pid=ImgDet&rs=1"
                alt=""
            />            

            <button className="logoutButton" onClick={handleLogout}>
                Đăng xuất
            </button>
        </div>        
    )

}

export default Header