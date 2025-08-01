import db from './db.js';

export const agregarImagen = (notaId, rutaImagen, callback) => {
  const query = `
    INSERT INTO Imagenes (NotaID, RutaImagen)
    VALUES (?, ?)
  `;
  db.query(query, [notaId, rutaImagen], (err, result) => {
    callback(err, result);
  });
};

export const obtenerImagenPorNota = (notaId, callback) => {
  const query = 'SELECT * FROM Imagenes WHERE NotaID = ?';
  db.query(query, [notaId], (err, results) => {
    callback(err, results[0]);
  });
};
