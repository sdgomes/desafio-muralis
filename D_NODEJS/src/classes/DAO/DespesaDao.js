module.exports = class DespesaDao {
  constructor(connection) {
    this.table = "despesas";
    this._connection = connection;
  }

  insert(_store) {
    return new Promise((resolve, reject) => {
      this.findPaymentTypeId(_store.tipoPagamento).then((tipo_pagamento_id) => {
        this._connection.query(`INSERT INTO ${this.table} (valor, data_compra, descricao, tipo_pagamento_id, categoria_id ) VALUES (?, ?, ?, ?, ?);`,
          [_store.valor.replace(/\./g, "").replace(/\,/g, "."), _store.data, _store.descricao, tipo_pagamento_id, _store.categoria.id,],
          (err, results, fields) => {
            if (err) {
              reject(err)
            }
            resolve(results.insertId);
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  update(_store, id) {
    return new Promise((resolve, reject) => {
      this.findPaymentTypeId(_store.tipoPagamento).then((tipo_pagamento_id) => {
        this._connection.query(`UPDATE ${this.table} SET valor=?, descricao=?, tipo_pagamento_id=? WHERE id = ?`,
          [_store.valor.replace(/\./g, "").replace(/\,/g, "."), _store.descricao, tipo_pagamento_id, id,],
          (err, results, fields) => {
            if (err) {
              reject(err)
            }
            console.log("Updated " + results.affectedRows + " row(s).");
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._connection.query(`DELETE FROM ${this.table}  WHERE id = ?`, [id], (err, results, fields) => {
        if (err) {
          reject(err)
        }
        console.log("Deleted " + results.affectedRows + " row(s).");
      });
    });
  }

  findPaymentTypeId(tipoPagamento) {
    return new Promise((resolve, reject) => {
      this._connection.query("SELECT id FROM tipos_pagamento WHERE tipo = ?",
        [this.standardizePayment(tipoPagamento)], (err, results, fields) => {
          if (err) {
            reject(err)
          } else if (results[0] == undefined) {
            reject("Tipo de pagamento não aceito")
          } else {
            resolve(results[0].id);
          }
        });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const despesas = [];
      this._connection.query(`SELECT DS.data_compra AS data, DS.descricao, CT.nome, 
      CT.descricao AS categoria_descricao, TP.tipo AS pagamento, ED.cep, ED.numero, 
      ED.logradouro, ED.complemento, ED.bairro, ED.localidade, 
      ED.uf, DS.valor FROM despesas DS INNER JOIN enderecos ED ON DS.id = ED.despesa_id 
      INNER JOIN categorias CT ON CT.id = DS.categoria_id 
      INNER JOIN tipos_pagamento TP ON TP.id = DS.tipo_pagamento_id 
      WHERE MONTH(DS.data_compra) = MONTH(NOW()) ORDER BY DS.id DESC`,
        (err, results, fields) => {
          if (err) {
            reject(err)
          }
          else {
            console.log("Selected " + results.length + " row(s).");
            for (var i = 0; i < results.length; i++) {
              despesas.push(results[i]);
            }
            resolve(despesas);
          }
        });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      var despesa = null;
      this._connection.query(`SELECT DS.id, DS.data_compra AS data, DS.descricao, CT.nome, 
      CT.descricao AS categoria_descricao,CT.id AS categoria_id, TP.tipo AS pagamento, ED.id AS endereco_id,
      ED.cep, ED.numero, ED.logradouro, ED.complemento, ED.bairro, ED.localidade,
      ED.uf, DS.valor FROM despesas DS INNER JOIN enderecos ED ON DS.id = ED.despesa_id
      INNER JOIN categorias CT ON CT.id = DS.categoria_id
      INNER JOIN tipos_pagamento TP ON TP.id = DS.tipo_pagamento_id 
      WHERE DS.id = ? ORDER BY DS.id DESC`,
        [id], (err, results, fields) => {
          if (err) {
            reject(err)
          }
          else {
            for (var i = 0; i < results.length; i++) {
              despesa = results[i];
            }
            resolve(despesa);
          }
        });
    });
  }

  standardizePayment(tipoPagamento) {
    var tPagamento = tipoPagamento.toUpperCase();
    tPagamento = tPagamento.normalize("NFD");
    tPagamento = tPagamento.replace(/[\u0300-\u036f]/g, "");

    return tPagamento;
  }
}