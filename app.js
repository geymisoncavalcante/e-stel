const express = require('express');
const app = express();
const flash = require('express-flash')
const pool = require('./database/database');
const bodyParser = require('body-parser');
const homeRouter = require('./router/homeRouter');
const radiosRouter = require('./router/radiosRouter');
const fontesRouter = require('./router/fontesRouter');
const celularesRouter = require('./router/celularesRouter');


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use('/home', homeRouter);
app.use('/radios', radiosRouter);
app.use('/fontes', fontesRouter);
app.use('/celulares', celularesRouter);

app.use(flash());



















app.listen(3000, (err)=>{
    if(err){
        console.log('erro na porta 3000')
        throw err   
    }else{
        console.log('Conectado ao servidor!')
    }
});