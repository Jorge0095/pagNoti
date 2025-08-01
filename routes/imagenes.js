import express from 'express';
import db from '../module/db.js';


const router = express.Router();

// Agregar imagen a una nota
router.post('/api/imagenes', (req, res) => {
  const { notaId, rutaImagen } = req.body;

  db.query(
    'INSERT INTO Imagenes (NotaID, RutaImagen) VALUES (?, ?)',
    [notaId, rutaImagen],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Imagen agregada a la nota' });
    }
  );
});

// Obtener imagen por ID de nota
router.get('/api/imagenes/:notaId', (req, res) => {
  const { notaId } = req.params;

  db.query('SELECT * FROM Imagenes WHERE NotaID = ?', [notaId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    res.json(results[0]);
  });
});

// Eliminar imagen por ID de nota
router.delete('/api/imagenes/:notaId', (req, res) => {
  const { notaId } = req.params;

  db.query('DELETE FROM Imagenes WHERE NotaID = ?', [notaId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Imagen eliminada' });
  });
});

export default router;
