const express = require('express');
const cors = require('cors');
const alunosRoutes = require('./routes/alunos')
const app = express();
const PORT = 3001;

app.use(cors()); // permite requisições de outros domínios (já qeu front e back estão separados)
app.use(express.json()); // habilita o parsing de JSON
app.use('/alunos', alunosRoutes) // todas as rotas em alunosRoutes estão disponíveis em '/alunos'

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
