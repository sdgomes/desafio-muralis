module.exports = class CategoriaDao {
  constructor(connection) {
    this.table = "categorias";
    this._connection = connection;
  }

  insert(_store) {
    return new Promise((resolve, reject) => {
      this._connection.query(`INSERT INTO ${this.table} (nome, descricao) VALUES (?, ?);`,
        [_store.nome, _store.descricao], (err, results, fields) => {
          if (err) throw err;
          else console.log("Inserted " + results.affectedRows + " row(s).");
          resolve(results.insertId);
        });
    });
  }

  update(_store, id) {
    return new Promise((resolve, reject) => {
      this._connection.query(`UPDATE ${this.table} SET nome=?, descricao=? WHERE id = ?`,
        [_store.nome, _store.descricao, id], (err, results, fields) => {
          if (err) throw err;
          else console.log("Updated " + results.affectedRows + " row(s).");
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id], (err, results, fields) => {
        if (err) throw err;
        else console.log("Deleted " + results.affectedRows + " row(s).");
      });
    });
  }
}