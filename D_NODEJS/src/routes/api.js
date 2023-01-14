const express = require("express");

const router = express.Router();

const ListarController = require("../controllers/listar.controller");
router.get("/api/despesas", [ListarController.index]);

const CadastrarController = require("../controllers/cadastrar.controller");
router.post("/api/despesas", [CadastrarController.index]);

const EditarController = require("../controllers/editar.controller");
router.put("/api/despesas", [EditarController.index]);

const RemoverController = require("../controllers/remover.controller");
router.delete("/api/despesas", [RemoverController.index]);

const AletrarController = require("../controllers/aletrar.controller");
router.patch("/api/despesas", [AletrarController.index]);

module.exports = router;
