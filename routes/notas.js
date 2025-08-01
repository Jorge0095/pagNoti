import express from 'express';
import db from '../module/db.js';

const router = express.Router();

// Crear nueva nota
router.post('/api/notas', (req, res) => {
  const { usuarioId, titulo, contenido } = req.body;

  if (!usuarioId || !titulo || !contenido) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
  }

  db.query(
    'INSERT INTO Notas (UsuarioID, Titulo, Contenido) VALUES (?, ?, ?)',
    [usuarioId, titulo, contenido],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Nota creada', notaId: result.insertId });
    }
  );
});

// Obtener todas las notas de un usuario
router.get('/api/notas/usuario/:usuarioId', (req, res) => {
  const { usuarioId } = req.params;
  db.query('SELECT * FROM Notas WHERE UsuarioID = ?', [usuarioId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Obtener una nota específica
router.get('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Notas WHERE ID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Nota no encontrada' });
    res.json(results[0]);
  });
});

// Actualizar una nota
router.put('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;

  db.query(
    'UPDATE Notas SET Titulo = ?, Contenido = ? WHERE ID = ?',
    [titulo, contenido, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Nota actualizada' });
    }
  );
});

// Eliminar una nota
router.delete('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Notas WHERE ID = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Nota eliminada' });
  });
});

export default router;
