app.get('/logs/:id', (req, res) => {
    const id = req.params.id;
    const logs = fs.readFileSync('logs.txt', 'utf8').split('\n');
  
    const linhaEncontrada = logs.find((linha) => linha.startsWith(id));
    if (linhaEncontrada) {
      return res.status(200).json({ log: linhaEncontrada });
    }
  
    res.status(404).json({ error: 'Log não encontrado.' });
  });
  