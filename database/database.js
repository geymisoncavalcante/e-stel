const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '123',
    database: 'teste',
    host: 'localhost',
    porta: 5432
});


pool.connect(function(err){
    if(err){
        console.log('erro no banco')
        throw err
    }else{
        console.log('Conectado ao banco teste')
    }
});


module.exports = pool;