const CustomersModel = require("../models/customers");
const { crypto } = require("../utils/password");

function index(req, res) {
  res.render("register", {
    title: "Cadastro de clientes"
  });
}

// Envio de informações para o banco
async function add(req, res) {
  const { name, age, email, password } = req.body;

  // Criptografando a senha
  const passwordCrypto = await crypto(password);

  const register = new CustomersModel({
    name: name,
    age: age,
    email: email,
    password: passwordCrypto
  });

  register.save();
  res.send("Cadastro finalizado");
}

async function listUsers(req, res) {
  const users = await CustomersModel.find();

  res.render("listUsers", {
    title: "Listagem de usuários",
    users: users
  });
}

module.exports = {
  index,
  add,
  listUsers
};
