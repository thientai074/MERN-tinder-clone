import './Home.css';
import Header from '../../components/header/Header';
import TinderCards from '../../components/tinderCard/TinderCards';
import SwipeButton from '../../components/swipeButton/SwipeButton';
import {Link} from 'react-router-dom';
import { useContext} from 'react';
import { CardContext} from '../../context/cardContext/CardContext';
import UpdateCardModal from '../../components/updateCardModal/UpdateCardModal';
const Home = () => {
    const {cardState: {card}} = useContext(CardContext)
    return (
       <div className="home">
            <Header/>
          
            <div className="tinder__card">
                <div >
                    {card !== null && <UpdateCardModal />}
                </div>
            
                <p>
                    Cùng 
                        <Link to="/" >
                            <button className="makeButton">Thêm ảnh</button>
                        </Link> và quẹt phải nào !!!
                </p>           
                <TinderCards/>
            </div>                
            <SwipeButton />
       </div>
    )    
}

export default Home