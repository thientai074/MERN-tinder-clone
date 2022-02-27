import {CARDS_LOADED_SUCCESS, CARDS_LOADED_FAIL, FIND_CARD, ADD_CARD, DELETE_CARD, UPDATE_CARD} from './CardActions';
const CardReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case CARDS_LOADED_SUCCESS: 
            return {
                ...state,
                cards: payload,
                cardsLoading: false
            }
        
        case CARDS_LOADED_FAIL:
            return {
                ...state,
                cards: [],
                cardsLoading: true
            }

        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, payload]
            }

        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card=> card._id !== payload)
            }
        
        case FIND_CARD:
            return {
                ...state,
                card: payload
            }
        
        case  UPDATE_CARD: 
            const newCards = state.cards.map(card=> card._id === payload._id ? payload : card)
            return {
                ...state,
                cards : newCards
            }

        default: 
            return state
    }

    
}

export default CardReducer