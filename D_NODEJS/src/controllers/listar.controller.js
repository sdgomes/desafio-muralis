const Database = require("../../models/Database");
const Categoria = require("../classes/Categoria");
const DespesaDao = require("../classes/DAO/DespesaDao");
const Despesa = require("../classes/Despesa");
const Endereco = require("../classes/Endereco");
const { convertPDF, buildExcel } = require("../util");

exports.index = (req, res) => {
  const { retorno } = req.query;

  const mysql = Database.getInstance();

  const despesasDao = new DespesaDao(mysql);

  const ObjDespesas = [];
  despesasDao.findAll().then((result) => {
    result.forEach((despesa) => {
      
      ObjDespesas.push(
        new Despesa({
          valor: despesa.valor,
          descricao: despesa.descricao,
          data: new Date(despesa.data),
          tipoPagamento: despesa.pagamento,
          endereco: new Endereco({
            cep: despesa.cep,
            numero: despesa.numero,
            logradouro: despesa.logradouro,
            complemento: despesa.complemento,
            bairro: despesa.bairro,
            localidade: despesa.localidade,
            uf: despesa.uf,
          }),
          categoria: new Categoria({
            nome: despesa.nome,
            descricao: despesa.categoria_descricao,
          }),
        }).transferObject()
      );
    });

    if (retorno == "PDF") {
      return convertPDF(ObjDespesas, res);
    }

    if (retorno == "planilha") {
      return buildExcel(ObjDespesas, res);
    }

    return res.status(201).json({
      data: ObjDespesas,
      success: true,
    });

  }).catch((error) => {
    return res.status(500).json({
      data: error,
      success: false,
    });
  });
};
