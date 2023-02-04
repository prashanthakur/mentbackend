const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
var db;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/testdb',{
   useNewUrlParser:true 
});
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("Succss");
})

app.get('/',(req,res)=>{
    res.send(`<h1 style="color:red">Get api is running on port 4000</h1>`)
})



app.listen(PORT,function(){
    console.log("Running on 4000")
})