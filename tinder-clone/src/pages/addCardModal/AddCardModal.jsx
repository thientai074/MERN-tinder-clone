import './AddCardModal.css';
import Header from '../../components/header/Header';
import SwipeButton from '../../components/swipeButton/SwipeButton';
import { useState, useContext} from 'react';
// import {createCard} from '../../context/cardContext/apiCalls'
import {CardContext} from '../../context/cardContext/CardContext';
import {useHistory} from 'react-router-dom';



const AddCardModal = () => {
    const history = useHistory()

    // Context

    const { addCard } = useContext(CardContext)
    

    const [newCard, setNewCard] = useState({
        name: '',
        imgUrl: ''
    })

    const { name, imgUrl} = newCard

    const onChangeNewCardForm = (e) => {
        setNewCard({...newCard, [e.target.name]: e.target.value})
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addCard(newCard)
        history.push("/home")

    }


    return (
        <div>
            <Header />
            <div className="addCardModal">
                <h2>Add some cool images </h2>
                <form className="addCardModal__form" onSubmit={handleSubmit}>
                    <label>Thêm quả ảnh cực xinh nào !!!</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name of picture" 
                            required 
                            onChange={onChangeNewCardForm}
                            value={name} />    

                        <input 
                            type="text" 
                            name="imgUrl" 
                            placeholder="Only Image address link on internet works" 
                            required 
                            onChange={onChangeNewCardForm}
                            value={imgUrl} />
                    
                    <div className="addCardModal__button">
                        <button className="cancerButton">Thoát</button>
                        <button type="submit" onClick={handleSubmit} className="createButton">Tạo ảnh</button>
                    </div>
                </form>
            </div>            
            <SwipeButton />
        </div>
    )

}

export default AddCardModal