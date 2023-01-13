const mysql = require("mysql2");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "d_nodejs",
  port: 3306,
};

class Database {
  constructor() {
    throw new Error("Use Database.getInstance()");
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new mysql.createConnection(config);
    }

    Database.instance.connect((err) => {
      if (err) {
        console.log("!!! Cannot connect !!! Error:");
        throw err;
      } else {
        console.log("Connection established.");
        buildingDatabase();
      }
    });

    return Database.instance;
  }
}

const buildingDatabase = () => {

  Database.instance.query(`CREATE TABLE if not exists categorias( 
    id int(6) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nome varchar(255) NOT NULL, descricao varchar(255) NOT NULL)
    ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;`,
    (err, results, fields) => {
      if (err) throw err;
      console.log("Created categorias table.");
    }).on("end", () => {

      Database.instance.query(`CREATE TABLE if not exists tipos_pagamento(
        id int(6) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        tipo varchar(30) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
        (err, results, fields) => {
          if (err) throw err;
          console.log("Created tipos_pagamento table.");
        }).on("end", () => {

          Database.instance.query(`CREATE TABLE if not exists despesas(
            id int(6) NOT NULL AUTO_INCREMENT PRIMARY KEY, valor double NOT NULL,
            data_compra datetime NOT NULL, descricao varchar(255) NOT NULL,
            tipo_pagamento_id int(6) NOT NULL, categoria_id int(6) NOT NULL, 
            CONSTRAINT fk_des_tipo_pag FOREIGN KEY (tipo_pagamento_id) REFERENCES tipos_pagamento(id), 
            CONSTRAINT fk_des_cat FOREIGN KEY (categoria_id) REFERENCES categorias(id)) 
            ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;`,
            (err, results, fields) => {
              if (err) throw err;
              console.log("Created despesas table.");
            }).on("end", () => {

              Database.instance.query(`CREATE TABLE IF NOT EXISTS enderecos(
                id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY, cep VARCHAR(20) NOT NULL,
                numero VARCHAR(10) DEFAULT NULL, logradouro VARCHAR(255) NOT NULL,
                complemento VARCHAR(255) DEFAULT NULL, bairro VARCHAR(255) NOT NULL,
                localidade VARCHAR(255) NOT NULL, uf VARCHAR(2) NOT NULL, 
                despesa_id INT(6) NOT NULL, 
                CONSTRAINT fk_ender_desp FOREIGN KEY(despesa_id) REFERENCES despesas(id))
                ENGINE = INNODB DEFAULT CHARSET = utf8mb4;`,
                (err, results, fields) => {
                  if (err) throw err;
                  console.log("Created enderecos table.");
                }).on("end", () => {

                  Database.instance.query("SELECT id FROM tipos_pagamento",
                    (err, results, fields) => {
                      if (err) throw err;
                      else if (results.length == 0) {

                        Database.instance.query(`INSERT INTO tipos_pagamento (tipo) VALUES ("CREDITO"), ("DEBITO"), ("PIX"), ("DINHEIRO");`,
                          [], (err, results, fields) => {
                            if (err) throw err;
                            console.log("Inserted " + results.affectedRows + " row(s).");
                          });
                      }
                    }
                  );
                });
            });
        });
    });
}
module.exports = Database;
