import { connection } from '../db.js';

export const getSchedules = async (req, res) => {
  try {
    const data = await connection.query(`SELECT H.id AS 'id', U.id AS 'id_profesional', CONCAT(U.nombre, ' ', U.apellido) AS 'nombre_profesional', E.especialidad AS 'especialidad', H.dia_semana AS 'dia_semana', H.hora_inicio AS 'hora_inicio', H.hora_fin AS 'hora_fin'
    FROM Horarios H
    JOIN Usuarios U
    ON H.usuario_id = U.id
    JOIN Especialidades E
    ON U.id = E.usuario_id
    `)
    console.log(data)
    return res.json(data)
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const getSchedule = async (req, res) => {
  const { id } = req.params
  console.log( 'ID', id);
  try {
    const data = await connection.query(`SELECT H.id AS 'id', U.id AS 'id_profesional', CONCAT(U.nombre, ' ', U.apellido) AS 'nombre_profesional', E.especialidad AS 'especialidad', H.dia_semana AS 'dia_semana', H.hora_inicio AS 'hora_inicio', H.hora_fin AS 'hora_fin', H.start AS 'start', H.end AS 'end'
    FROM Horarios H
    JOIN Usuarios U
    ON H.usuario_id = U.id
    JOIN Especialidades E
    ON U.id = E.usuario_id
    WHERE H.id = ? `, [id])
    console.log(data)
    if (data.length <= 0) return res.status(404).json({ message: 'Cita no encontrada' })
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const createSchedule = async (req, res) => {
  const { usuario_id , dia_semana, hora_inicio, hora_fin } = req.body
  const rows = await connection.query('INSERT INTO Horarios (usuario_id , dia_semana, hora_inicio, hora_fin) VALUES (?,?,?,?) ', [usuario_id , dia_semana, hora_inicio, hora_fin])

  res.json({
    id: rows.insertId,
    usuario_id,
    dia_semana,
    hora_inicio,
    hora_fin
  })
}

export const updateSchedule = async (req, res) => {
  const { id } = req.params
  const { usuario_id , dia_semana, hora_inicio, hora_fin } = req.body

  const [selectedCita] = await connection.query('SELECT * FROM Horarios WHERE id = ? ', [id])
  console.log('selectedCita', selectedCita);
  try {
    const data = await connection.query('UPDATE Horarios SET usuario_id = ?, dia_semana = ?, hora_inicio = ?, hora_fin= ? WHERE id = ?', [usuario_id , dia_semana, hora_inicio, hora_fin, id])

    if (data.length <= 0) return res.status(404).json({ message: 'Cita no encontrada' })
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const deleteSchedule = async (req, res) => {
  const { id } = req.params
  const data = await connection.query('DELETE FROM Horarios WHERE id = ? ', [id])

  console.log(data);
  if (data.length <= 0) return res.status(404).json({ message: 'Horario no encontrado' })
  return res.sendStatus(204)
}