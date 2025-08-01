import express from 'express';
import db from '../module/db.js';


const router = express.Router();

// Agregar nota a favoritos
router.post('/api/favoritos', (req, res) => {
  const { usuarioId, notaId } = req.body;

  db.query(
    'INSERT INTO NotasFavoritas (UsuarioID, NotaID) VALUES (?, ?)',
    [usuarioId, notaId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Nota agregada a favoritos' });
    }
  );
});

// Obtener favoritos por usuario
router.get('/api/favoritos/:usuarioId', (req, res) => {
  const { usuarioId } = req.params;

  db.query(
    `SELECT N.* FROM NotasFavoritas NF
     JOIN Notas N ON NF.NotaID = N.ID
     WHERE NF.UsuarioID = ?`,
    [usuarioId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Eliminar favorito
router.delete('/api/favoritos', (req, res) => {
  const { usuarioId, notaId } = req.body;

  db.query(
    'DELETE FROM NotasFavoritas WHERE UsuarioID = ? AND NotaID = ?',
    [usuarioId, notaId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Favorito eliminado' });
    }
  );
});

export default router;
