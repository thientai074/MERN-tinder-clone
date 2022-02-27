require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const cardRouter = require('./routes/card');

app.use(cors());

app.use(express.json());


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Tinder', {            
            useNewUrlParser: true,
            useUnifiedTopology: true,            
        })
        console.log('Ket noi Database thanh cong !!!!!')
    } catch(error) {
        console.log(error.message)
    }    
}
connectDB();

app.use('/api/auth', authRouter);
app.use('/api', cardRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))