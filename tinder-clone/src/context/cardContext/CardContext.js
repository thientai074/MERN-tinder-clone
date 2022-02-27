import { createContext, useReducer, useState} from 'react';
import CardReducer from './CardReducer';
import axios from 'axios';
import { apiUrl} from '../authContext/apiCalls'
import {CARDS_LOADED_SUCCESS, CARDS_LOADED_FAIL, ADD_CARD, FIND_CARD, DELETE_CARD, UPDATE_CARD} from './CardActions';


export const CardContext = createContext()

export const CardContextProvider = ({children}) => {
    const [cardState, dispatch] = useReducer(CardReducer, {
        card: null,        
        cards: [],
        cardsLoading: true
    })

    const [showUpdateCardModal, setShowUpdateCardModal] = useState(false)

    const setAuthToken = token => {
            if(token){
                axios.defaults.headers.common['Authorization'] =`Bearer ${token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        }

    //  Get all cards
    const getCards = async () => {
        if(localStorage.getItem("user")){
            setAuthToken(JSON.parse(localStorage.getItem("user")))

        } try {
                const res = await axios.get(`${apiUrl}/card`, {
                    headers: {
                        Authorization : "Bearer " + JSON.parse(localStorage.getItem("user"))
                    }
                })
                if(res.data.success) {
                    dispatch({type: CARDS_LOADED_SUCCESS, payload: res.data.cards})
                }

        } catch (error) {
                dispatch({type: CARDS_LOADED_FAIL})
    }
    }

    // add Card
    const addCard = async newCard => {
        if(localStorage.getItem("user")){
            setAuthToken(JSON.parse(localStorage.getItem("user")))
        } 
        try {
            const res = await axios.post(`${apiUrl}/card`, newCard , {
                headers: {                    
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))
                }                
            })
            if(res.data.success) {
                dispatch({type: ADD_CARD, payload: res.data.card})
                return res.data
            }
        } catch (error) {
            return error.res.data
				? error.res.data
				: { success: false, message: 'Server error' }
        }
                
    }

    // delete Card
    const deleteCard = async  cardId => {
        if(localStorage.getItem("user")){
            setAuthToken(JSON.parse(localStorage.getItem("user")))
        } 
            try {
                const res = await axios.delete(`${apiUrl}/card/${cardId}`, {
                    headers: {
                        Authorization : "Bearer " + JSON.parse(localStorage.getItem("user"))
                    }
                })

                if(res.data.success) {
                    dispatch({type: DELETE_CARD, payload: cardId})
                }
            } catch (error) {
                console.log(error)
            }
    }
    //  find card
    const findCard = cardId => {
        const card = cardState.cards.find(card=> card._id === cardId)
        dispatch({type: FIND_CARD, payload: card})

    }

    // update card
    const updateCard = async updatedCard => {
        try {
            const res = await axios.put(`${apiUrl}/card/${updatedCard._id}`, updatedCard)
            if(res.data.success) {
                dispatch({type: UPDATE_CARD, payload: res.data.card})
                return res.data
            }            
        } catch (error) {
            return error.res.data
				? error.res.data
				: { success: false, message: 'Server error' }
        }
    }


    const cardContextData = {
        cardState,
        getCards,
        addCard,
        deleteCard,
        updateCard,
        findCard,
        showUpdateCardModal,
        setShowUpdateCardModal
    }

    return (
        <CardContext.Provider value={cardContextData}>
            {children}
        </CardContext.Provider>
    )

}

