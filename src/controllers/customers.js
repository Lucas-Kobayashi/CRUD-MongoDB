const CustomersModel = require("../models/customers");
const { use } = require("../routes");
const { crypto } = require("../utils/password");

const defaultTitle = "Cadastro de Clientes";

// Tela de registro
function index(req, res) {
  res.render("register", {
    title: defaultTitle
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
  res.render("register", {
    title: defaultTitle,
    message: "Cadastro realizado com sucesso"
  });
}

// Lista de usuários
async function listUsers(req, res) {
  const users = await CustomersModel.find();

  res.render("listUsers", {
    title: "Listagem de usuários",
    users: users
  });
}

async function indexEdit(req, res) {
  const { id } = req.query;

  const user = await CustomersModel.findById(id);

  res.render("edit", {
    title: "Editar usuário",
    user
  });
}

async function edit(req, res) {
  const { name, age, email } = req.body;

  const { id } = req.params;
  const user = await CustomersModel.findById(id);

  user.name = name;
  user.age = age;
  user.email = email;

  user.save();

  res.render("edit", {
    title: "Editar usuário",
    user,
    message: "Usuário alterado com sucesso"
  });
}

async function remove(req, res) {
  const { id } = req.params;

  const remove = await CustomersModel.deleteOne({ _id: id });

  res.redirect("/list");
}

module.exports = {
  index,
  add,
  listUsers,
  indexEdit,
  edit,
  remove
};
