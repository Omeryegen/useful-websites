const router = require('express').Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB);

const Category = mongoose.model('Categories', { 
    category: Array,
 });

 const detectCategory = (language, response)=>{
    if(language.includes('tr')){
        return response[0];
    }else if(language.includes('de')){
        return response[2];
    }else{
        return response[1];
    };  
 };

router.post('/', (req,res) =>{
    const lang = req.body.language
    Category.find({}).then((response)=>{
        res.status(200).json({
            "success": "Succesfully finished!",
            "categories": detectCategory(lang, response)
        });
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({
            error:"Something went wrong!"
        });
    });
});
module.exports = router;