const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.use('/websites', require('./routes/webites'));
app.use('/categories', require('./routes/categories'));

app.use('/websites', require('./routes/webites'));
app.use('/categories', require('./routes/categories'));

if(process.env.NODE_ENV === "deployement"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    console.log('hi')
    app.get("/", (req,res) => res.sendFile(__dirname, "../", "frontend", "build", "index.html"))
}else{
    app.get('/', (req,res)=>{
        res.status(200).json({
            message:"Something went wrong!"
        })
    })
}


app.listen(PORT, () => {
    console.log("listening for requests");
})
