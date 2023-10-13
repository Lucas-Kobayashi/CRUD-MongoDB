const router = require("express").Router();

const CustomersController = require("../controllers/customers");
const IndexController = require("../controllers/index");

// Rotas
router.get("/", IndexController.index);

// Registro
router.get("/register", CustomersController.index);
router.post("/register/add", CustomersController.add);

// Listar usuários
router.get("/list", CustomersController.listUsers);

// Editar
router.get("/edit", CustomersController.indexEdit);
router.post("/edit/:id", CustomersController.edit);

router.get("/remove/:id", CustomersController.remove);

module.exports = router;
