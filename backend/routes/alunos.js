const express = require('express');
const router = express.Router(); // app do express que define rotas em módulos separados

let alunos = []; // armazenamento em memória para os alunos
let nextId = 1; // variável para gerar IDs incrementais

// retorna toda a listas de alunos
router.get('/', (req, res) => {
    res.json(alunos);
});

// retorna um aluno específico com base em seu id
router.get('/:id', (req, res) => {
    // busca na lista de alunos um aluno cujo id é igual ao id fornecido na url
    const aluno = alunos.find(a => a.id === parseInt(req.params.id)); //parseInt converte o id para um numero inteiro
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// cadastra um novo aluno
router.post('/', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }
    const novoAluno = { id: nextId++, nome, email };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

// atualiza os dados de um aluno
router.put('/:id', (req, res) => {
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

// deleta os dados de um aluno
router.delete('/:id', (req, res) => {
    const index = alunos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        alunos.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

module.exports = router;