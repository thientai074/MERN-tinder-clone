import { useContext, useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import { CardContext } from '../../context/cardContext/CardContext';
import './TinderCards.css';
import ActionButtons from '../ActionButtons/ActionButtons';

const TinderCards = ({_id}) => { 

    const {cardState: {cards},
            getCards,
            setShowUpdateCardModal} =useContext(CardContext)

    useEffect(()=> getCards(), [])

    console.log(cards)

    const swiped = (direction, nameToDelete) => {
        console.log(("removing: " + nameToDelete))
        // setLastDirection(direction)        
    }

    const outOfFrame = (name) => {
        console.log(name+ " left the screen")
    }  
   
    return (
        <div className="tinderCards">            
            <div className="tinderCards__cardContainer">
                {cards.map((card)=> (
                    <TinderCard 
                        className="swipe"
                        key={card._id}
                        preventSwipe={["up", "dowm"]}
                        onSwipe={(dir)=> swiped(dir, card.name), ()=>setShowUpdateCardModal(false)}
                        onCardLeftScreen={()=> outOfFrame(card.name)}
                    >
                        <div 
                            style={{backgroundImage: `url(${card.imgUrl})`, backgroundSize: 'cover'}}                            
                            className="card">
                            <h3>{card.name}</h3>                            
                            <ActionButtons _id={card._id} />                                                                                              
                        </div>                       
                    </TinderCard>                                     
                 ))}                            
            </div>            
        </div>       
    )
} 
export default TinderCards