const RadiosModel = require('../models/RadiosModel');
const pool = require('../database/database');



const radiosController = {

    radios: function (req, res) {
      
        RadiosModel.radios((err, result) => {
            if (err) {
                console.log(err)
            } else {
                // res.json(result.rows)
                res.render('pages/radios', { radios: result.rows })
            }
        })
    },

    cadRadios: function (req, res) {
        res.render('pages/cadRadios')
    },

    getMradios: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_marcaradios', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },

    getModelo: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_modeloradios', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },

    getMfonte: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_marcafontes', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },

    getEquipamento: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_equipamentos', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },

    getEstacao: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_estacoes', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },

    getFrequencia: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_frequencias', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            })
        })
    },

    getTecnologia: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_tecnologias', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },

    getStatus: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from radio.tab_status', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },

    getOme: async function () {
        return new Promise((resolve, reject) => {
            pool.query('select * from mrh.organizacao', function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    return resolve(result.rows)
                }
            });
        });
    },
    // cria o insert do cadastro de rádios passando req res
    insertRadios: function (req, res) {
        //Passo 1: capturar atraves do body as requisições
        let { tombamento,
            serie,
            mradio,
            modeloradio,
            mfonte,
            equipamento,
            estacao,
            frequencia,
            tecnologia,
            statu,
            motivo,
            sei_sigep,
            ome,
            obs
        } = req.body;

        pool.query('insert into radio.cad_radios(id_tombamento, serie, id_mradio, id_modeloradio, id_mfonte, id_equipamento, id_estacao, id_frequencia, id_tecnologia, id_status, motivo, sei_sigep, id_ome, obs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
            [
                tombamento,
                serie,
                mradio,
                modeloradio,
                mfonte,
                equipamento,
                estacao,
                frequencia,
                tecnologia,
                statu,
                motivo,
                sei_sigep,
                ome,
                obs
            ],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserido com sucesso');
                    res.redirect('/radios');
                }
            }
        )
    }
}


module.exports = radiosController;