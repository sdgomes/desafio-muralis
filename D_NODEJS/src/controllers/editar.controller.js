const Database = require("../../models/Database");
const CategoriaDao = require("../classes/DAO/CategoriaDao");
const DespesaDao = require("../classes/DAO/DespesaDao");
const EnderecoDao = require("../classes/DAO/EnderecoDao");
const Despesa = require("../classes/Despesa");
const { validFields } = require("../util");

exports.index = async (req, res) => {
    const mysql = Database.getInstance();

    const { id } = req.body;
    const despesa = new Despesa(req.body);

    const despesaDao = new DespesaDao(mysql);
    const categoriaDao = new CategoriaDao(mysql);
    const enderecoDao = new EnderecoDao(mysql);

    if (despesa.endereco.cep) {
        await fetch(`https://viacep.com.br/ws/${despesa.endereco.cep.replace(/[^0-9]/g, "")}/json`)
            .then((response) => response.json()).then((data) => {
                if (data.hasOwnProperty("erro")) {
                    return res.status(500).json({
                        data: "CEP Inváido",
                        success: false,
                    });
                }
                despesa.completeAddress(data)
            }).catch((error) => {
                return res.status(500).json({
                    data: "CEP Inváido",
                    success: false,
                });
            });
    }

    if (!validFields(despesa)) {
        return res.status(500).json({
            data: "Erro algum parametro não foi passado corretamnete",
            success: false,
        });
    }

    despesaDao.findById(id).then((result) => {

        categoriaDao.update(despesa.categoria, result.categoria_id);
        enderecoDao.update(despesa.endereco, result.endereco_id);
        despesaDao.update(despesa, result.id);

        return res.status(201).json({
            data: despesa,
            success: true,
        });
    }).catch((error) => {
        return res.status(500).json({
            data: error,
            success: false,
        });
    });
};
