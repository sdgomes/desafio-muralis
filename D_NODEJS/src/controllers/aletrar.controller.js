const Database = require("../../models/Database");
const CategoriaDao = require("../classes/DAO/CategoriaDao");
const DespesaDao = require("../classes/DAO/DespesaDao");
const EnderecoDao = require("../classes/DAO/EnderecoDao");
const Despesa = require("../classes/Despesa");

exports.index = async (req, res) => {
    /** START DB */
    const mysql = Database.getInstance();

    const { id } = req.body;
    /** Starta Objetos */
    const despesa = new Despesa(req.body);

    /** Object DAO */
    const despesaDao = new DespesaDao(mysql);
    const categoriaDao = new CategoriaDao(mysql);
    const enderecoDao = new EnderecoDao(mysql);

    /** Busca CEP para alteração se informado */
    if (despesa.endereco.cep) {
        await fetch(`https://viacep.com.br/ws/${despesa.endereco.cep.replace(/[^0-9]/g, "")}/json`)
            .then((response) => response.json()).then((data) => despesa.completeAddress(data));
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

        /** Atualizações */
        categoriaDao.update(despesa.categoria, result.categoria_id);
        enderecoDao.update(despesa.endereco, result.endereco_id);
        despesaDao.update(despesa, result.id);

        return res.status(201).json({
            data: despesa,
            success: true,
        });
    });
}