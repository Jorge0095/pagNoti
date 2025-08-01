import express from 'express';
import bcrypt from 'bcrypt';
import db from '../module/db.js';
import { registrarUsuario, verificarUsuario } from '../module/auth.js';

const router = express.Router();

// Registrar usuario
router.post('/api/usuarios', (req, res) => {
  const { nombreCompleto, correo, nombreUsuario, contrasena } = req.body;

  if (!nombreCompleto || !correo || !nombreUsuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
  }

  registrarUsuario(nombreCompleto, correo, nombreUsuario, contrasena, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Iniciar sesión
router.post('/api/login', (req, res) => {
  const { nombreUsuario, contrasena } = req.body;

  if (!nombreUsuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan datos de inicio de sesión' });
  }

  verificarUsuario(nombreUsuario, contrasena, (err, usuario) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.ID,
        nombre: usuario.NombreCompleto,
        correo: usuario.CorreoElectronico,
        nombreUsuario: usuario.NombreUsuario
      }
    });
  });
});

// Obtener todos los usuarios
router.get('/api/usuarios', (req, res) => {
  db.query('SELECT ID, NombreCompleto, CorreoElectronico, NombreUsuario FROM Usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Obtener usuario por ID
router.get('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT ID, NombreCompleto, CorreoElectronico, NombreUsuario FROM Usuarios WHERE ID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(results[0]);
  });
});

// Actualizar usuario por ID
router.put('/api/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const { nombreCompleto, correo, nombreUsuario, contrasena } = req.body;

  if (!nombreCompleto || !correo || !nombreUsuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
  }

  try {
    const hash = await bcrypt.hash(contrasena, 10);
    db.query(
      'UPDATE Usuarios SET NombreCompleto = ?, CorreoElectronico = ?, NombreUsuario = ?, Contraseña = ? WHERE ID = ?',
      [nombreCompleto, correo, nombreUsuario, hash, id],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Usuario actualizado correctamente' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario por ID
router.delete('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Usuarios WHERE ID = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
});

export default router;
