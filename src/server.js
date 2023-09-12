const express = require("express");
const path = require("path");
const routes = require("./routes");
const db = require("./database");

const app = express();

// Conexão com o banco de dados
db.connect();

// Definindo o template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Definindo arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Habilita server a receber dados via post
app.use(express.urlencoded({ extended: true }));

// Definindo as rotas
app.use("/", routes);

// 404 Page not found
app.use((req, res) => {
  res.send("Página não encontrada");
});

// Executando o servidor
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening port ${port}`));
