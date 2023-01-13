const Categoria = require("./Categoria");
const Endereco = require("./Endereco");

module.exports = class Despesa {
  constructor({ endereco, valor, descricao, tipoPagamento, categoria }) {
    this.endereco = new Endereco(endereco ?? {});
    this.valor = valor;
    this.descricao = descricao;
    this.data = new Date();
    this.tipoPagamento = tipoPagamento;
    this.categoria = new Categoria(categoria ?? {});
  }

  /** Compara dados do banco com dados atuais
  * para fazer update apenas das informações recebidas pela 
  * requisição
  */
  comparison({ endereco, valor, descricao, tipoPagamento, categoria }) {
    this.valor = this.valor ?? valor;
    this.descricao = this.descricao ?? descricao;
    this.tipoPagamento = this.tipoPagamento ?? tipoPagamento;

    this.endereco.comparison(endereco);
    this.categoria.comparison(categoria);

    this.currency();
    this.payment();
  }

  completeAddress(endereco) {
    endereco.numero = this.endereco.numero;
    this.endereco = new Endereco(endereco);
  }

  currency() {
    this.valor = new Intl.NumberFormat("pt-BR", { currency: "BRL" }).format(
      this.valor.toString().replace(/\./g, "").replace(/\,/g, ".")
    );
  }

  payment() {
    const method = {
      CREDITO: "Crédito",
      DEBITO: "Débito",
      PIX: "Pix",
      DINHEIRO: "Dinheiro",
    };
    this.tipoPagamento = method[this.tipoPagamento];
  }

  transferObject() {
    this.endereco.beautify();
    this.currency();
    this.payment();
    return this;
  }
};
