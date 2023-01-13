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

    /** Válida se todos os campos foram informados */
    var isValid = true;
    for (const key in despesa) {
        if (Object.hasOwnProperty.call(despesa, key)) {
            const element = despesa[key];
            if (typeof element === "object" && element !== null) {
                for (const keyIntern in element) {
                    if (Object.hasOwnProperty.call(element, keyIntern)) {
                        const elementIntern = element[keyIntern];
                        if (!elementIntern && keyIntern != "complemento") {
                            isValid = false;
                        }
                    }
                }
            } else {
                if (!element) {
                    isValid = false;
                }
            }
        }
    }

    if (!isValid) {
        return res.status(201).json({
            data: "Erro algum parametro não foi passado corretamnete",
            success: true,
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
    });
};
