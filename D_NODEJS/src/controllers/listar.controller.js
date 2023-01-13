const Database = require("../../models/Database");
const Categoria = require("../classes/Categoria");
const DespesaDao = require("../classes/DAO/DespesaDao");
const Despesa = require("../classes/Despesa");
const Endereco = require("../classes/Endereco");

exports.index = (req, res) => {
  /** START DB */
  const mysql = Database.getInstance();

  /** Object DAO */
  const despesasDao = new DespesaDao(mysql);

  const ObjDespesas = [];
  despesasDao.findAll().then((result) => {
    result.forEach((despesa) => {
      ObjDespesas.push(
        new Despesa({
          endereco: new Endereco({
            cep: despesa.cep,
            numero: despesa.numero,
            logradouro: despesa.logradouro,
            complemento: despesa.complemento,
            bairro: despesa.bairro,
            localidade: despesa.localidade,
            uf: despesa.uf,
          }),
          valor: despesa.valor,
          descricao: despesa.descricao,
          data: new Date(despesa.data),
          tipoPagamento: despesa.pagamento,
          categoria: new Categoria({
            nome: despesa.nome,
            descricao: despesa.categoria_descricao,
          }),
        }).transferObject()
      );
    });

    return res.status(201).json({
      data: ObjDespesas,
      success: true,
    });
  });
};
