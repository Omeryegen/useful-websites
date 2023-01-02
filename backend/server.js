const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/websites', require('./routes/webites'));
app.use('/categories', require('./routes/categories'));

app.listen(5000, ()=>{
    console.log('Listening on port 5000')
})