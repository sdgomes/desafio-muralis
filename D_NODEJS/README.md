
# D_NODEJS

Application made for the challenge proposed by **Muralis Tecnologia**
## Author

- [@sdgomes](https://github.com/sdgomes)


## Installation

*Download the challenge folder via git and enter the project folder.
Install the dependencies via npm*

```bash
  git clone git@github.com:sdgomes/desafio-muralis.git
  cd desafio-muralis/D_NODEJS
  npm install
```
    
## Database configuration

In the ./models folder, Database.js file change the config to your database credentials.

```javascript
const mysql = require("mysql2");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "d_nodejs",
  port: 3306,
};
```


### Dev environment

To run the project in the development environment

```bash
  npm run dev
```


## API documentation

#### Main requests

| Verb HTTP   | Path       | Function                           |
| :---------- | :--------- | :---------------------------------- |
| `GET` | `/api/despesas` | Returns all expenses for the current month. |
| `POST` | `/api/despesas` | Register a new expense and return the result. |

#### *Body request*
```http
PUT|PATCH|DELETE /api/despesas
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | Expense id for database reference. |
| `valor`      | `string` | Preço da desbesa em reias **BRL**.  |
| `descricao`  | `string` | Information on what type of expense it is, example: `New shoe`. |
| `tipoPagamento` | `string` | Possible values `Crédito` `Débito` `Pix` `Dinheiro`. |
| `categoria` | `Object:`   | `{ nome: String, descricao: String }`. |
| `endereco`      | `Object:` |  `{ cep: String, numero: String }`. |

```http
GET /api/despesas?retorno=
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `retorno`      | `string` | `PDF` returns a .pdf file `planilha` downloads an .xlsx file with expenses and empty returns a list of all records. |