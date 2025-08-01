import express from 'express';
import cors from 'cors';

import usuariosRoutes from './routes/usuarios.js';
import notasRoutes from './routes/notas.js';
import imagenesRoutes from './routes/imagenes.js';
import favoritosRoutes from './routes/favoritos.js';

const app = express();

app.use(cors());
app.use(express.json()); 

app.use(usuariosRoutes);
app.use(notasRoutes);
app.use(imagenesRoutes);
app.use(favoritosRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de pagNoti');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
