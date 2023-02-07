const pool = require("../database/database");

module.exports = class RadiosModel {
  static radios(callback) {
    return pool.query("select * from radio.cad_radios", callback);
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
