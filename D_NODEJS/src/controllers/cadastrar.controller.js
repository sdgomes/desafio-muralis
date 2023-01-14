const Database = require("../../models/Database");
const CategoriaDao = require("../classes/DAO/CategoriaDao");
const DespesaDao = require("../classes/DAO/DespesaDao");
const EnderecoDao = require("../classes/DAO/EnderecoDao");
const Despesa = require("../classes/Despesa");
const { validFields } = require("../util");

exports.index = async (req, res) => {
    const mysql = Database.getInstance();

    const despesa = new Despesa(req.body);

    const categoriaDao = new CategoriaDao(mysql);
    const despesaDao = new DespesaDao(mysql);
    const enderecoDao = new EnderecoDao(mysql);

    if (despesa.endereco.cep) {
        var validation = {
            error: "",
            respose: false
        }
        await fetch(`https://viacep.com.br/ws/${despesa.endereco.cep.replace(/[^0-9]/g, "")}/json`)
            .then((response) => response.json()).then((data) => {
                if (data.hasOwnProperty("erro")) {
                    validation.error = "CEP Inválido"
                    validation.respose = true

                    return;
                }
                despesa.completeAddress(data)
            }).catch((error) => {
                validation.error = error
                validation.respose = true
            });

        if (validation.respose)
            return res.status(401).json({
                data: validation.error,
                success: false,
            });
    }

    if (!validFields(despesa)) {
        return res.status(500).json({
            data: "Erro algum parametro não foi passado corretamnete",
            success: false,
        });
    }

    categoriaDao.insert(despesa.categoria).then((result) => {
        despesa.categoria.id = result;

        despesaDao.insert(despesa).then((result) => {
            despesa.id = result;
            enderecoDao.insert(despesa.endereco, despesa.id).catch((error) => {
                return res.status(500).json({
                    data: error,
                    success: false,
                });
            });

            delete despesa.categoria.id;

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
    }).catch((error) => {
        return res.status(500).json({
            data: error,
            success: false,
        });
    });
};
