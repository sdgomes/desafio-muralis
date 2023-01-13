module.exports = class Endereco {
  constructor({ cep, numero, logradouro, complemento, bairro, localidade, uf }) {
    this.cep = cep;
    this.numero = numero;
    this.logradouro = logradouro;
    this.complemento = complemento;
    this.bairro = bairro;
    this.localidade = localidade;
    this.uf = uf;
  }

  /** Compara dados do banco com dados atuais
   * para fazer update apenas das informações recebidas pela 
   * requisição
   */
  comparison({ cep, numero, logradouro, complemento, bairro, localidade, uf }) {
    this.cep = this.cep ?? cep;
    this.numero = this.numero ?? numero;
    this.logradouro = this.logradouro ?? logradouro;
    this.complemento = this.complemento ?? complemento;
    this.bairro = this.bairro ?? bairro;
    this.localidade = this.localidade ?? localidade;
    this.uf = this.uf ?? uf;

    this.beautify();
  }
  beautify() {
    this.cep = this.cep
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  }
};
