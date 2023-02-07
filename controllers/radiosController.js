const RadiosModel = require('../models/RadiosModel');
const pool = require('../database/database');



const radiosController = {

    radios: function (req, res) {
        let sql = 'select id_tombamento, te.descricao as te_descricao, te.id_equipamento as id_equipamento,tes.descricao as tes_descricao, tes.id_estacao as id_estacao, tf.descricao as tf_descricao, tf.id_frequencia as id_frequencia, tmf.descricao as tmf_descricao, tmf.id_mfonte as id_mfonte,tmr.descricao as tmr_descricao, tmr.id_mradio as id_mradio, tm.descricao as tm_descricao, tm.id_modeloradio as id_modeloradio, ts.descricao as ts_descricao, ts.id_status as id_status, tt.descricao as tt_descricao, tt.id_tecnologia as id_tecnologia, serie, motivo, sei_sigep, obs, og.sigla as ome, og.id_organizacao as id_ome, atualizacao from radio.cad_radios as cr left join radio.tab_equipamentos as te on (te.id_equipamento = cr.id_equipamento) left join radio.tab_estacoes as tes on (tes.id_estacao = cr.id_estacao) left join radio.tab_frequencias as tf on (tf.id_frequencia = cr.id_frequencia) left join radio.tab_marcafontes as tmf on (tmf.id_mfonte = cr.id_mfonte) left join radio.tab_marcaradios as tmr on (tmr.id_mradio = cr.id_mradio) left join radio.tab_modeloradios as tm on (tm.id_modeloradio = cr.id_modeloradio) left join radio.tab_status as ts on (ts.id_status = cr.id_status) left join radio.tab_tecnologias as tt on (tt.id_tecnologia = cr.id_tecnologia) left join mrh.organizacao as og on (og.id_organizacao = cr.id_ome)'
        pool.query(sql, [], (err, result) => {
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