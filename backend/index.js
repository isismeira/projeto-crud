const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let alunos = []; // Armazenamento em memória para os alunos
let nextId = 1; // Variável para gerar IDs incrementais

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/alunos', (req, res) => {
    res.json(alunos);
  });

app.get('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

app.post('/alunos', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }
    const novoAluno = { id: nextId++, nome, email };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
  });
 
app.put('/alunos/:id', (req, res) => {
    const { nome, email } = req.body;
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    if (aluno) {
      aluno.nome = nome || aluno.nome;
      aluno.email = email || aluno.email;
      res.json(aluno);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  });

app.delete('/alunos/:id', (req, res) => {
    const index = alunos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
      alunos.splice(index, 1);
      res.status(204).end(); // No Content
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  });
  
  