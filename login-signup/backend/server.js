const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

//importing routes
const getRouter=require('./routes/User');
app.use('/user',getRouter);


app.get('/',(req,res)=>{
    res.send("Hello World");
})

mongoose.connect(process.env.DB_CONNECTION
    ,{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    } ,()=>{
    console.log('connected')
})
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNING ON PORT ${PORT}`);
})
