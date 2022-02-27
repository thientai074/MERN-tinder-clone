// import {deleteCard} from '../../context/cardContext/apiCalls';
import {useContext} from 'react';
import {CardContext} from '../../context/cardContext/CardContext';
import {Button} from 'react-bootstrap';
import './ActionButtons.css';


const ActionButtons = ({_id}) => {

  

    const { deleteCard, findCard, setShowUpdateCardModal} = useContext(CardContext)

    const chooseCard = (cardId) => {
        findCard(cardId)
        setShowUpdateCardModal(true)
    }
    
    return (
        <div className="changeButton">
            <Button className="UpdateButton" onClick={chooseCard.bind(this, _id)} >Chỉnh sửa ảnh</Button>

            <Button className="deleteCardButton" onClick={deleteCard.bind(this, _id)}  >Xóa ảnh này</Button>  
        </div>
    )

}

export default ActionButtons