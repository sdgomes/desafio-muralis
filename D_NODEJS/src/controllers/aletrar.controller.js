const Database = require("../../models/Database");
const CategoriaDao = require("../classes/DAO/CategoriaDao");
const DespesaDao = require("../classes/DAO/DespesaDao");
const EnderecoDao = require("../classes/DAO/EnderecoDao");
const Despesa = require("../classes/Despesa");

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

    despesaDao.findById(id).then((result) => {
        const target = new Despesa({
            endereco: {
                cep: result.cep,
                numero: result.numero,
                logradouro: result.logradouro,
                complemento: result.complemento,
                bairro: result.bairro,
                localidade: result.localidade,
                uf: result.uf,
            },
            valor: result.valor,
            descricao: result.descricao,
            data: result.data,
            tipoPagamento: result.pagamento,
            categoria: {
                nome: result.nome,
                descricao: result.categoria_descricao,
            },
        });
        despesa.comparison(target);

        categoriaDao.update(despesa.categoria, result.categoria_id).catch((error) => {
            return res.status(500).json({
                data: error,
                success: false,
            });
        });
        enderecoDao.update(despesa.endereco, result.endereco_id).catch((error) => {
            return res.status(500).json({
                data: error,
                success: false,
            });
        });
        despesaDao.update(despesa, result.id).catch((error) => {
            return res.status(500).json({
                data: error,
                success: false,
            });
        });

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
}