import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import usuariosRoutes from './routes/usuarios.js';
import notasRoutes from './routes/notas.js';
import imagenesRoutes from './routes/imagenes.js';
import favoritosRoutes from './routes/favoritos.js';

// Para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use(usuariosRoutes);
app.use(notasRoutes);
app.use(imagenesRoutes);
app.use(favoritosRoutes);

// HTML Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/register.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/menu.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/admin.html'));
});

app.get('/user-menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/user-menu.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
