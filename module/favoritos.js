import db from './db.js';

export const marcarFavorito = (usuarioId, notaId, callback) => {
  const query = `
    INSERT INTO NotasFavoritas (UsuarioID, NotaID)
    VALUES (?, ?)
  `;
  db.query(query, [usuarioId, notaId], (err, result) => {
    callback(err, result);
  });
};

export const obtenerFavoritosPorUsuario = (usuarioId, callback) => {
  const query = `
    SELECT N.* FROM NotasFavoritas NF
    JOIN Notas N ON NF.NotaID = N.ID
    WHERE NF.UsuarioID = ?
  `;
  db.query(query, [usuarioId], (err, results) => {
    callback(err, results);
  });
};

export const eliminarFavorito = (usuarioId, notaId, callback) => {
  const query = 'DELETE FROM NotasFavoritas WHERE UsuarioID = ? AND NotaID = ?';
  db.query(query, [usuarioId, notaId], (err, result) => {
    callback(err, result);
  });
};
