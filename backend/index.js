const express = require('express');
const app = express();
require('dotenv').config();
const tasks = require('./Routes/TaskRouter');
const db = require('./Database/db');
const bodyParser = require('body-parser');
db();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.get('/',function(req,res){
    res.send('Hello World!');
})

app.use('/tasks', tasks);