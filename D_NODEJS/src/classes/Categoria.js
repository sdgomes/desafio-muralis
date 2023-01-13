module.exports = class Categoria {
  constructor({ nome = null, descricao = null }) {
    this.nome = nome;
    this.descricao = descricao;
  }

  /** Compara dados do banco com dados atuais
   * para fazer update apenas das informações recebidas pela 
   * requisição
   */
  comparison({ nome, descricao }) {
    this.nome = this.nome ?? nome;
    this.descricao = this.descricao ?? descricao;
  }
};