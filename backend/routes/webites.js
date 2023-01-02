const router = require('express').Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB);

const Website = mongoose.model('Websites', { 
    name: String,
    url: String,
    icon: String,
    title: Array,
    description_de: String,
    description_en: String,
    description_tr: String,
 });


router.get('/', (req,res) =>{
   
    Website.find({}).then((response)=>{
        res.status(200).json({
            success: "Succesfully finished!",
            data: response
        });
    })
    .catch((err)=>{
        res.status(400).json({
            error:"Something went wrong!"
        });
    });

});

module.exports = router;