module.exports = class Categoria {
  constructor({ nome = null, descricao = null }) {
    this.nome = nome;
    this.descricao = descricao;
  }

  comparison({ nome, descricao }) {
    this.nome = this.nome ?? nome;
    this.descricao = this.descricao ?? descricao;
  }
};