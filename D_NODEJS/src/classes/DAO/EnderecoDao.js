module.exports = class EnderecoDao {
  constructor(connection) {
    this.table = "enderecos";
    this._connection = connection;
  }

  insert(_store, despesa_id) {
    return new Promise((resolve, reject) => {
      this._connection.query(`INSERT INTO ${this.table} (cep, numero, logradouro, complemento, bairro, 
        localidade, uf, despesa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [_store.cep.replace(/[^0-9]/g, ""), _store.numero, _store.logradouro, _store.complemento,
        _store.bairro, _store.localidade, _store.uf, despesa_id],
        (err, results, fields) => {
          if (err) {
            reject(err)
          }
          resolve(results);
        });
    });
  }

  update(_store, id) {
    return new Promise((resolve, reject) => {
      this._connection.query(`UPDATE ${this.table} SET cep=?, numero=?, logradouro=?, complemento=?,
       bairro=?, localidade=?, uf=? WHERE id = ?`,
        [_store.cep.replace(/[^0-9]/g, ""), _store.numero, _store.logradouro, _store.complemento,
        _store.bairro, _store.localidade, _store.uf, id,],
        (err, results, fields) => {
          if (err) {
            reject(err)
          }
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._connection.query(`DELETE FROM ${this.table}  WHERE id = ?`, [id], (err, results, fields) => {
        if (err) {
          reject(err)
        }
      });
    });
  }
}