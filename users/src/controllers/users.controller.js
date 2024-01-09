import { connection } from '../db.js';

export const getUsers = async (req, res) => {
  try {
    const data = await connection.query('SELECT * FROM Usuarios')
    return res.json(data)
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const getProfessionals = async (req, res) => {
  try {
    const data = await connection.query(`SELECT U.id AS 'id', U.nombre AS 'nombre', U.apellido AS 'apellido', U.telefono AS 'telefono', U.email AS 'email', U.contrasena AS 'contrasena', U.fecha_nacimiento AS 'fecha_nacimiento', U.genero AS 'genero', U.tipo_usuario AS 'tipo_usuario', E.especialidad AS 'especialidad'  
    FROM Usuarios U
    JOIN Especialidades E
    ON U.id=E.usuario_id
    WHERE U.tipo_usuario='profesional'`)
    return res.json(data)
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const data = await connection.query('SELECT * FROM Usuarios WHERE id = ? ', [id])
    if (data.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' })
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const getProfessional = async (req, res) => {
  const { id } = req.params
  try {
    const data = await connection.query(`SELECT U.id AS 'id', U.nombre AS 'nombre', U.apellido AS 'apellido', U.telefono AS 'telefono', U.email AS 'email', U.contrasena AS 'contrasena', U.fecha_nacimiento AS 'fecha_nacimiento', U.genero AS 'genero', U.tipo_usuario AS 'tipo_usuario', E.especialidad AS 'especialidad'  
    FROM Usuarios U
    JOIN Especialidades E
    ON U.id=E.usuario_id
    WHERE U.id= ? `, [id])
   
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const createUsers = async (req, res) => {
  const { nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario } = req.body
  const rows = await connection.query('INSERT INTO Usuarios (nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario) VALUES (?,?,?,?,?,?,?,?) ', [nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario])

  res.json({
    id: rows.insertId,
    nombre, 
    apellido, 
    telefono, 
    email, 
    contrasena, 
    fecha_nacimiento, 
    genero, 
    tipo_usuario
  })
}


export const createDoctor = async (req, res) => {
  const { nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario, especialidad } = req.body
  const rows = await connection.query('INSERT INTO Usuarios (nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario) VALUES (?,?,?,?,?,?,?,?) ', [nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario])

  const rows_especialidad = await connection.query('INSERT INTO Especialidades (especialidad, usuario_id) VALUES (?, ?)', [especialidad, rows.insertId])

  res.json({
    id: rows.insertId,
    nombre, 
    apellido, 
    telefono, 
    email, 
    contrasena, 
    fecha_nacimiento, 
    genero, 
    tipo_usuario,
    especialidad
  })
}


export const updateUsers = async (req, res) => {
  const { id } = req.params
  const { nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario } = req.body

  const [selectedUser] = await connection.query('SELECT * FROM Usuarios WHERE id = ? ', [id])

  try {
    const data = await connection.query('UPDATE Usuarios SET nombre = ?, apellido = ?, telefono = ?, email = ?, contrasena = ?, fecha_nacimiento = ?, genero = ?, tipo_usuario = ? WHERE id = ?', [nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario, id])

    if (data.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' })
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const deleteUsers = async (req, res) => {
  const { id } = req.params
  const data = await connection.query('DELETE FROM Usuarios WHERE id = ? ', [id])

  console.log(data);
  if (data.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' })
  return res.sendStatus(204)
}


export const updateDoctor = async (req, res) => {
  const { id } = req.params
  const { nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario, especialidad } = req.body

  try {
    const data = await connection.query('UPDATE Usuarios SET nombre = ?, apellido = ?, telefono = ?, email = ?, contrasena = ?, fecha_nacimiento = ?, genero = ?, tipo_usuario = ? WHERE id = ?', [nombre, apellido, telefono, email, contrasena, fecha_nacimiento, genero, tipo_usuario, id])

    const especialidad_user = await connection.query('UPDATE Especialidades SET especialidad = ? WHERE usuario_id = ?', [especialidad, id])

    if (data.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' })
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}