const CustomersModel = require("../models/customers");
const { crypto } = require("../utils/password");

// Envio de informações para o banco
async function add(req, res) {
  const { name, age, email, password } = req.body;

  // Criptografando a senha
  const passwordCrypto = await crypto(password);

  const register = new CustomersModel({
    name,
    age,
    email,
    password: passwordCrypto
  });

  register.save();
  res.send("Cadastro finalizado");
}

module.exports = {
  add
};
