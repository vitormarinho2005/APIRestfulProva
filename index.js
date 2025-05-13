const express = require('express');
const fs = require('fs');
const { registrarLog } = require('./script');

const app = express();
const port = 3000;

app.use(express.json());

// Rota para adicionar um novo log
app.post('/logs', (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório.' });
  }

  const id = registrarLog(nome);
  res.status(201).json({ message: 'Log registrado com sucesso.', id });
});

// Rota para consultar log por ID
app.get('/logs/:id', (req, res) => {
  const id = req.params.id;

  try {
    const conteudo = fs.readFileSync('logs.txt', 'utf8');
    const linhas = conteudo.split('\n');
    const linhaEncontrada = linhas.find((linha) => linha.startsWith(id));

    if (linhaEncontrada) {
      return res.status(200).json({ log: linhaEncontrada });
    } else {
      return res.status(404).json({ error: 'Log não encontrado.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao ler o arquivo de logs.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
