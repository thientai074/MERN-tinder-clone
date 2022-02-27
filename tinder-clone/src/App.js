import './App.css';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import Home from './pages/home/Home'
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import AddCardModal from './pages/addCardModal/AddCardModal'
import { AuthContext} from './context/authContext/AuthContext';
import { useContext} from 'react';

function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          {user ? <AddCardModal/> : <Redirect to="/register" />}          
        </Route>
        <Route exact path="/register" >
          <Register/>
        </Route>
        <Route exact path="/login">
          {!user ? <Login/> : <Redirect to="/" />}
        </Route>     
        <Route exact patch="/home">
          <Home />        
        </Route>     
      </Switch>
    </Router>  
  );
}

export default App;
