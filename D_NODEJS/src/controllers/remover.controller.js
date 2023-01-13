const Database = require("../../models/Database");
const CategoriaDao = require("../classes/DAO/CategoriaDao");
const DespesaDao = require("../classes/DAO/DespesaDao");
const EnderecoDao = require("../classes/DAO/EnderecoDao");

exports.index = async (req, res) => {
    /** START DB */
    const mysql = Database.getInstance();

    const { id } = req.body;

    /** Object DAO */
    const despesaDao = new DespesaDao(mysql);
    const categoriaDao = new CategoriaDao(mysql);
    const enderecoDao = new EnderecoDao(mysql);

    despesaDao.findById(id).then((result) => {
        enderecoDao.delete(result.endereco_id);
        despesaDao.delete(result.id);
        categoriaDao.delete(result.categoria_id);

        return res.status(201).json({
            data: "Entidade apagada com sucesso",
            success: true,
        });
    });
};
