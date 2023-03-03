const pool = require("../database/database");

module.exports = class RadiosModel {
  static radios(callback) {
    return pool.query("select id_tombamento, te.descricao as te_descricao, te.id_equipamento as id_equipamento,tes.descricao as tes_descricao, tes.id_estacao as id_estacao, tf.descricao as tf_descricao, tf.id_frequencia as id_frequencia, tmf.descricao as tmf_descricao, tmf.id_mfonte as id_mfonte,tmr.descricao as tmr_descricao, tmr.id_mradio as id_mradio, tm.descricao as tm_descricao, tm.id_modeloradio as id_modeloradio, ts.descricao as ts_descricao, ts.id_status as id_status, tt.descricao as tt_descricao, tt.id_tecnologia as id_tecnologia, serie, motivo, sei_sigep, obs, og.sigla as ome, og.id_organizacao as id_ome, to_char(atualizacao, 'DD-MM-YYYY HH24:MI:SS') as atual from radio.cad_radios as cr left join radio.tab_equipamentos as te on (te.id_equipamento = cr.id_equipamento) left join radio.tab_estacoes as tes on (tes.id_estacao = cr.id_estacao) left join radio.tab_frequencias as tf on (tf.id_frequencia = cr.id_frequencia) left join radio.tab_marcafontes as tmf on (tmf.id_mfonte = cr.id_mfonte) left join radio.tab_marcaradios as tmr on (tmr.id_mradio = cr.id_mradio) left join radio.tab_modeloradios as tm on (tm.id_modeloradio = cr.id_modeloradio) left join radio.tab_status as ts on (ts.id_status = cr.id_status) left join radio.tab_tecnologias as tt on (tt.id_tecnologia = cr.id_tecnologia) left join mrh.organizacao as og on (og.id_organizacao = cr.id_ome)",callback);
  }

  static editarRadios(id, body, callback) {
    return pool.query(
      "UPDATE radio.cad_radios SET id_tombamento =$1, serie =$2, id_mradio =$3, id_modeloradio =$4, id_mfonte =$5, id_equipamento =$6, id_estacao =$7, id_frequencia =$8, id_tecnologia =$9, id_status =$10, motivo =$11, sei_sigep =$12, id_ome =$13, obs =$14, atualizacao = current_timestamp where id_tombamento =$15",
      [
        body.tombamento,
        body.serie,
        body.mradio,
        body.modeloradio,
        body.mfonte,
        body.equipamento,
        body.estacao,
        body.frequencia,
        body.tecnologia,
        body.statu,
        body.motivo,
        body.sei_sigep,
        body.ome,
        body.obs,
        id,
      ],
      callback
    );
  }
  
};
