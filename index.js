// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Node.js!');
});
app.get('/alacancha', (req, res) => {
  res.send('¡Hola alacanchan!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
