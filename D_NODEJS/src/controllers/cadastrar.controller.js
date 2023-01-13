const Database = require("../../models/Database");
const CategoriaDao = require("../classes/DAO/CategoriaDao");
const DespesaDao = require("../classes/DAO/DespesaDao");
const EnderecoDao = require("../classes/DAO/EnderecoDao");
const Despesa = require("../classes/Despesa");

exports.index = (req, res) => {
    /** START DB */
    const mysql = Database.getInstance();

    /** Starta Objetos */
    const despesa = new Despesa(req.body);

    /** Object DAO */
    const categoriaDao = new CategoriaDao(mysql);
    const despesaDao = new DespesaDao(mysql);
    const enderecoDao = new EnderecoDao(mysql);

    fetch(`https://viacep.com.br/ws/${despesa.endereco.cep.replace(/[^0-9]/g, "")}/json`)
        .then((response) => response.json()).then((data) => {
            despesa.completeAddress(data);

            categoriaDao.insert(despesa.categoria).then((result) => {
                despesa.categoria.id = result;

                despesaDao.insert(despesa).then((result) => {
                    despesa.id = result;
                    enderecoDao.insert(despesa.endereco, despesa.id);

                    /** Remove id de Categoria para exibição */
                    delete despesa.categoria.id;
                    
                    return res.status(201).json({
                        data: despesa,
                        success: true,
                    });
                });
            });
        });
};
