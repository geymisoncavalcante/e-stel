const pool = require('../database/database');


const celularesController = {

    celulares: function(req, res){
        const sql = ''

        pool.query(sql, [], (err, result)=>{
            if(err){
                console.log(err)
                throw err
            }else{
                //res.json(result.rows)
                res.render('pages/celulares')
            }
        })
    }    

}



module.exports = celularesController