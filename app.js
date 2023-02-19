const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 7000;
const MONGO_URL_MENTOR= process.env.MONGO_URL_MENTOR
const Mentor =  require('./Mentor')

app.use(cors());
app.use(bodyParser.json());

mongoose.set('strictQuery', true);

// mongoose.connect('mongodb+srv://thakurgmail_com:1239910@cluster0.z32tm.mongodb.net/Studybase?retryWrites=true&w=majority',{
//    useNewUrlParser:true 
// });
mongoose.connect(MONGO_URL_MENTOR,{
   useNewUrlParser:true 
});
// mongoose.connect('mongodb://127.0.0.1:27017/testdb',{
//    useNewUrlParser:true 
// });
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("Connection Established !"); 
})

// run()
async function run () {
  try{
    // const user = await Mentor.where("name").equals("Kyles")
    // const user = await Mentor.deleteOne({name:"Prashant"})
    const user = await Mentor.create ({name:"Prem Lata",email:"mail@gmail.com",expertise:"no"})
    // const user = new User({ name: "Kyle",})
    // await user. save ()
  console.log(user)
  }catch(e){
    console.log(e.message)
  }

}

app.get('/',(req,res)=>{
    res.send(`<h1 style="color:red">Get api is running on port 4000</h1>`)
})

app.use('/routes/test',require('./routes/Auth'))

app.get('/getall',async(req,res)=>{
  try{
    const user = await Mentor.find()
  res.status(200).send(user)
  }catch(e){
    console.log(e.message)
  } 
})

app.post('/mentors',async(req,res)=>{
  // console.log(req.body)
  try{
    const user = await Mentor.create ({name:req.body.name,email:req.body.email,expertise:req.body.expert})
    // const user = new User({ name: "Kyle",})
    // await user. save ()
  // console.log(user)
  res.status(200).send("User Created Successfully !")
  }catch(e){
    console.log(e.message)
    res.send(e.message)
  } 
})

app.post('/find-mentors',async(req,res)=>{
  try{
    const user = await Mentor.where("email").equals(req.body.email)
    res.status(200).send(user)
  }catch(e){
    console.log(e.message)
  } 
})

app.post('/courses',async(req,res)=>{
  try{
    const user = await Mentor.where("expertise").equals(req.body.search)
    res.status(200).send(user)
  }catch(e){
    console.log(e.message)
  } 
})

app.get('/id/:email',async(req,res)=>{
  try{
    const val = req.params.email
    console.log(val)
    const user = await Mentor.where("email").equals(val)
    res.status(200).send(user)
  }catch(e){
    console.log(e.message)
  } 
})

app.delete('/del-mentors',async(req,res)=>{
  try{
    const userFound = await Mentor.find({email:req.body.email}) 
    console.log(userFound)
    if(userFound.length===0){
      res.status(404).send("No user Found")
    }
    else{const user = await Mentor.deleteOne().where("email").equals(req.body.email)
    res.status(200).send("Deleted Successfully")
  }
    // res.status(200).send("Deleted Successfully")
  }catch(e){
    console.log(e.message)
  } 
})



app.listen(PORT,function(){
    console.log(`Running on ${PORT}`)
})