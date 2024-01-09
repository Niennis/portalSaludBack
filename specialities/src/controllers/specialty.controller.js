import { connection } from '../db.js';

export const getSpecialties = async (req, res) => {
  try {
    const data = await connection.query(`SELECT * FROM Especialidades`)
    console.log(data)
    return res.json({ response: data })
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const getSpecialty = async (req, res) => {
  const { id } = req.params
  try {
    const data = await connection.query('SELECT * FROM Especialidades WHERE id = ? ', [id])
    console.log(data)
    if (data.length <= 0) return res.status(404).json({ message: 'Especialidad no encontrada' })
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const createSpecialty = async (req, res) => {
  const { usuario_id, especialidad } = req.body
  const rows = await connection.query('INSERT INTO Especialidades (usuario_id, especialidad) VALUES (?,?) ', [usuario_id, especialidad])

  res.json({
    id: rows.insertId,
    profesional_id,
    alumno_id,
    fecha,
    hora,
    estado
  })
}

export const updateSpecialty = async (req, res) => {
  const { id } = req.params
  const { usuario_id, especialidad } = req.body

  const [selectedSpeciality] = await connection.query('SELECT * FROM Especialidades WHERE id = ? ', [id])
  console.log('selectedSpeciality', selectedSpeciality);
  try {
    const data = await connection.query('UPDATE Especialidades SET usuario_id= ?, especialidad = ? WHERE id = ?', [usuario_id, especialidad])

    if (data.length <= 0) return res.status(404).json({ message: 'Especialidad no encontrada' })
    return res.json(data[0])
  } catch (error) {
    return res.json(
      {
        message: error.message
      }
    )
  }
}

export const deleteSpecialty = async (req, res) => {
  const { id } = req.params
  const data = await connection.query('DELETE FROM Especialidades WHERE id = ? ', [id])

  console.log(data);
  if (data.length <= 0) return res.status(404).json({ message: 'Especialidad no encontrada' })
  return res.sendStatus(204)
}