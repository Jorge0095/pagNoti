import bcrypt from 'bcrypt';
import db from './db.js';

// Registrar usuario
export const registrarUsuario = async (nombreCompleto, correo, nombreUsuario, contrasena, callback) => {
  try {
    db.query(
      'SELECT * FROM Usuarios WHERE CorreoElectronico = ? OR NombreUsuario = ?',
      [correo, nombreUsuario],
      async (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
          return callback(null, { mensaje: 'El correo electrónico o nombre de usuario ya existe' });
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(contrasena, saltRounds);

        db.query(
          'INSERT INTO Usuarios (NombreCompleto, CorreoElectronico, NombreUsuario, Contraseña) VALUES (?, ?, ?, ?)',
          [nombreCompleto, correo, nombreUsuario, hash],
          (err, result) => {
            if (err) return callback(err);
            callback(null, { mensaje: 'Usuario registrado correctamente' });
          }
        );
      }
    );
  } catch (error) {
    callback(error);
  }
};

// Verificar usuario
export const verificarUsuario = (nombreUsuario, contrasena, callback) => {
  db.query('SELECT * FROM Usuarios WHERE NombreUsuario = ?', [nombreUsuario], async (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, false);

    const usuarioDB = results[0];
    const match = await bcrypt.compare(contrasena, usuarioDB.Contraseña);
    if (match) {
      callback(null, usuarioDB);
    } else {
      callback(null, false);
    }
  });
};
