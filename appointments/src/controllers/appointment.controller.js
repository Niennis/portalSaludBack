import { connection } from '../db.js';

export const getAppointments = async (req, res) => {
  try {
    const data = await connection.query(`SELECT C.id AS 'id', U.nombre AS 'nombre_alumno', U.apellido AS 'apellido_alumno', P.nombre AS 'nombre_profesional', P.apellido AS 'apellido_profesional', E.especialidad AS 'especialidad', U.email AS 'mail_alumno', C.fecha AS 'fecha_cita', C.hora AS 'hora_cita', U.telefono AS 'telefono_alumno', U.email AS 'email_alumno', C.estado AS "estado"
    FROM Usuarios U
    JOIN Citas C
    ON U.id=C.alumno_id
    JOIN Usuarios P
    ON C.profesional_id=P.id
    JOIN Especialidades E
    ON P.id=E.usuario_id
    WHERE U.tipo_usuario='alumno' AND P.tipo_usuario='profesional'`)
    return res.json({ response: data })
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const getAppointment = async (req, res) => {
  const { id } = req.params
  try {
    const data = await connection.query(`SELECT C.id AS 'id', U.nombre AS 'nombre_alumno', U.apellido AS 'apellido_alumno', P.nombre AS 'nombre_profesional', P.apellido AS 'apellido_profesional', E.especialidad AS 'especialidad', U.email AS 'mail_alumno', C.fecha AS 'fecha_cita', C.hora AS 'hora_cita', U.telefono AS 'telefono_alumno', U.email AS 'email_alumno', C.estado AS "estado"
    FROM Usuarios U
    JOIN Citas C
    ON U.id=C.alumno_id
    JOIN Usuarios P
    ON C.profesional_id=P.id
    JOIN Especialidades E
    ON P.id=E.usuario_id
    WHERE U.tipo_usuario='alumno' AND P.tipo_usuario='profesional' and C.id = ? `, [id])
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

export const createAppointment = async (req, res) => {
  const { profesional_id, alumno_id, fecha, hora, estado } = req.body
  const rows = await connection.query('INSERT INTO Citas (profesional_id, alumno_id, fecha, hora, estado) VALUES (?,?,?,?,?) ', [profesional_id, alumno_id, fecha, hora, estado])

  res.json({
    id: rows.insertId,
    profesional_id,
    alumno_id,
    fecha,
    hora,
    estado
  })
}

export const updateAppointment = async (req, res) => {
  const { id } = req.params
  const { profesional_id, alumno_id, fecha, hora, estado } = req.body

  const [selectedCita] = await connection.query('SELECT * FROM Citas WHERE id = ? ', [id])
  console.log('selectedCita', selectedCita);
  try {
    const data = await connection.query('UPDATE Citas SET profesional_id = ?, alumno_id = ?, fecha = ?, hora= ?, estado = ? WHERE id = ?', [profesional_id, alumno_id, fecha, hora, estado, id])

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

export const deleteAppointment = async (req, res) => {
  const { id } = req.params
  const { estado } = req.body

  const data = await connection.query('UPDATE Citas SET estado = ? WHERE id = ? ', [estado, id])

  console.log(data);
  try {
    if (data.length <= 0) return res.status(404).json({ message: 'Cita no encontrada' })
    return res.sendStatus(204)
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}



export const getAppointmentsSimple = async (req, res) => {
  try {
    const data = await connection.query(`SELECT C.id AS 'id', E.especialidad AS 'especialidad', C.fecha AS 'fecha_cita', C.hora AS 'hora_cita', C.estado AS "estado", U.id AS 'id_patient', P.id AS 'id_professional'
    FROM Usuarios U
    JOIN Citas C
    ON U.id=C.alumno_id
    JOIN Usuarios P
    ON C.profesional_id=P.id
    JOIN Especialidades E
    ON P.id=E.usuario_id
    WHERE U.tipo_usuario='alumno' AND P.tipo_usuario='profesional'`)
    return res.json(data)
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}


export const getAppointmentsSimpleUser = async (req, res) => {
  const { id } = req.params
  try {
    const data = await connection.query(`SELECT C.id AS 'id', E.especialidad AS 'especialidad', C.fecha AS 'fecha_cita', C.hora AS 'hora_cita', C.estado AS "estado", U.id AS 'id_patient', P.id AS 'id_professional', U.genero AS 'genero'
    FROM Usuarios U
    JOIN Citas C
    ON U.id=C.alumno_id
    JOIN Usuarios P
    ON C.profesional_id=P.id
    JOIN Especialidades E
    ON P.id=E.usuario_id
    WHERE U.tipo_usuario='alumno' AND P.tipo_usuario='profesional' and C.id = ? `, [id])
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