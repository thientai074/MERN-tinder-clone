const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const verifyToken = require('../middleware/auth');

// create Card
// Route api/card
router.post('/card',verifyToken, async (req, res)=> {
    const { name, imgUrl } = req.body
    try {
        const newCard = new Card({
            name,
            imgUrl,
            user: req.userId
            })
        await newCard.save()
        res.json({
            success: true,
            card: newCard
        })
    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// Get Cards
// route api/card
router.get('/card',verifyToken, async (req, res)=> {
    try{
        const cards = await Card.find({user: req.userId}).populate('user', ['username'])
        res.json({success: true, cards})
    } catch(error){
        console.log(error)
        res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// Update Card
// route api/card/:id
router.put('/card/:id', verifyToken, async (req, res) => {
    const {name, imgUrl} = req.body

    try {
        let updatedCard = { name, imgUrl}

        const cardUpdateCondition = { _id: req.params.id, user: req.userId}

        updatedCard = await Card.findOneAndUpdate(cardUpdateCondition, updatedCard, {new: true})

        if(!updatedCard){
            return res.json({
                success: false,
                message: 'Card not found or authorised'
            })
        }

        res.json({
            success: true, 
            message: 'Update card successfully',
            card: updatedCard
        })
    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal server error'
        })        
    }
})

// Delete Card
// Route api/card/:id
router.delete('/card/:id',verifyToken, async (req, res)=> {
    try {
        const cardDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedCard = await Card.findOneAndDelete(cardDeleteCondition)

        if(!deletedCard) {
            return res.json({
                success: false,
                message: 'Card not found or authorised'
            })
        }
        res.json({
            success: true,
            message: 'Delete card successfully',
            card: deletedCard
        })        
    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal server error'
        })        
    }
    }
)

module.exports = router


