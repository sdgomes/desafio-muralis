const express = require("express");
const router = express.Router();

/** GET METHOD
 *  Listar despesas
 */
const ListarController = require("../controllers/listar.controller");
router.get("/api/despesas", [ListarController.index]);

/** POST METHOD
 *  Cadastrar despesa
 */
const CadastrarController = require("../controllers/cadastrar.controller");
router.post("/api/despesas", [CadastrarController.index]);

/** PUT METHOD
 *  Editar despesa
 */
const EditarController = require("../controllers/editar.controller");
router.put("/api/despesas", [EditarController.index]);

/** DELETE METHOD
 *  Remover despesa
 */
const RemoverController = require("../controllers/remover.controller");
router.delete("/api/despesas", [RemoverController.index]);

/** PATCH METHOD
 *  Aletra despesa
 */
const AletrarController = require("../controllers/aletrar.controller");
router.patch("/api/despesas", [AletrarController.index]);

module.exports = router;
