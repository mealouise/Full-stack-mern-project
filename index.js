const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express(); //

const routes = require('./routes/router');

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 

app.use('/', routes);//has to be put just after bodyparser


app.engine('.hbs', hbs ({ 
    defaultLayout: 'layout',
    extname: '.hbs'
}));


app.set('view engine', '.hbs');



app.listen(8080, () => { 
    console.log('server is listening on port 8080');
});