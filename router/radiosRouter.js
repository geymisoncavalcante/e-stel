const express = require("express");
const radiosController = require("../controllers/radiosController");
const pool = require("../database/database");
const router = express.Router();
const RadiosModel = require("../models/RadiosModel");


//      /radios
router.get("/", radiosController.radios);

// Rota de retorno do Edite
router.get("/edit/:id", async (req, res) => {
  let mRadios = await radiosController.getMradios();
  let modeloRadios = await radiosController.getModelo();
  let mFontes = await radiosController.getMfonte();
  let tEquipamentos = await radiosController.getEquipamento();
  let tEstacoes = await radiosController.getEstacao();
  let tFrequencias = await radiosController.getFrequencia();
  let tecnologias = await radiosController.getTecnologia();
  let status = await radiosController.getStatus();
  let Omes = await radiosController.getOme();


  const id = req.params.id;
  const sql =
    "select id_tombamento, te.descricao as te_descricao, te.id_equipamento as id_equipamento,tes.descricao as tes_descricao, tes.id_estacao as id_estacao, tf.descricao as tf_descricao, tf.id_frequencia as id_frequencia, tmf.descricao as tmf_descricao, tmf.id_mfonte as id_mfonte,tmr.descricao as tmr_descricao, tmr.id_mradio as id_mradio, tm.descricao as tm_descricao, tm.id_modeloradio as id_modeloradio, ts.descricao as ts_descricao, ts.id_status as id_status, tt.descricao as tt_descricao, tt.id_tecnologia as id_tecnologia, serie, motivo, sei_sigep, obs, og.sigla as ome, og.id_organizacao as id_ome, atualizacao from radio.cad_radios as cr left join radio.tab_equipamentos as te on (te.id_equipamento = cr.id_equipamento) left join radio.tab_estacoes as tes on (tes.id_estacao = cr.id_estacao) left join radio.tab_frequencias as tf on (tf.id_frequencia = cr.id_frequencia) left join radio.tab_marcafontes as tmf on (tmf.id_mfonte = cr.id_mfonte) left join radio.tab_marcaradios as tmr on (tmr.id_mradio = cr.id_mradio) left join radio.tab_modeloradios as tm on (tm.id_modeloradio = cr.id_modeloradio) left join radio.tab_status as ts on (ts.id_status = cr.id_status) left join radio.tab_tecnologias as tt on (tt.id_tecnologia = cr.id_tecnologia) left join mrh.organizacao as og on (og.id_organizacao = cr.id_ome) where id_tombamento = $1";
  pool.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      //res.json(result.rows)
 
      res.render("pages/editRadios", { IdRadios: result.rows, mRadios,modeloRadios, mFontes, tEquipamentos, tEstacoes, tFrequencias, tecnologias, status, Omes });
    }
  });
});

router.post("/editRadios/:id?", async function (req, res) {
  let id = req.params.id;
  let {
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
    obs,
  } = req.body;

  RadiosModel.editarRadios(id, req.body, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Editado com sucesso!");
     res.redirect("/radios")
    }
  });
});

router.get('/deletRadios/:id', async function(req, res){
  let id = req.params.id;
  let sql = 'DELETE from radio.cad_radios where id_tombamento = $1'
  pool.query(sql, [id], (err, result) =>{
    if(err){
      console.log(err)
    }else{
      //res.json(`${id} número deletado `);
      res.redirect('/radios')
    }
  });

})

router.get("/cadRadios", async function (req, res) {
  let mradios = await radiosController.getMradios();
  let modeloradios = await radiosController.getModelo();
  let marcafontes = await radiosController.getMfonte();
  let equipamentos = await radiosController.getEquipamento();
  let estacoes = await radiosController.getEstacao();
  let frequencias = await radiosController.getFrequencia();
  let tecnologias = await radiosController.getTecnologia();
  let status = await radiosController.getStatus();
  let omes = await radiosController.getOme();

  //res.json(omes)
  res.render("pages/cadRadios", {
    mradios,
    modeloradios,
    marcafontes,
    equipamentos,
    estacoes,
    frequencias,
    tecnologias,
    status,
    omes,
  });
});

router.post("/insertRadios", radiosController.insertRadios);

module.exports = router;
