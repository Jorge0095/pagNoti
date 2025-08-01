import db from './db.js';

export const agregarNota = (usuarioId, titulo, contenido, callback) => {
  const query = `
    INSERT INTO Notas (UsuarioID, Titulo, Contenido)
    VALUES (?, ?, ?)
  `;
  db.query(query, [usuarioId, titulo, contenido], (err, result) => {
    callback(err, result);
  });
};

export const obtenerNotasPorUsuario = (usuarioId, callback) => {
  const query = 'SELECT * FROM Notas WHERE UsuarioID = ? ORDER BY FechaCreacion DESC';
  db.query(query, [usuarioId], (err, results) => {
    callback(err, results);
  });
};

export const eliminarNota = (notaId, callback) => {
  const query = 'DELETE FROM Notas WHERE ID = ?';
  db.query(query, [notaId], (err, result) => {
    callback(err, result);
  });
};
