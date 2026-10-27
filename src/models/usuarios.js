const database = require("../config/database");

const publicColumns = "id, nombre, email, fecha_creacion, fecha_actualizacion";

async function findAll() {
  const { rows } = await database.query(
    `SELECT ${publicColumns} FROM usuarios ORDER BY id`,
  );
  return rows;
}

async function findById(id) {
  const { rows } = await database.query(
    `SELECT ${publicColumns} FROM usuarios WHERE id = $1`,
    [id],
  );
  return rows[0] || null;
}

async function findByEmail(email) {
  const { rows } = await database.query(
    `SELECT id FROM usuarios WHERE email = $1 LIMIT 1`,
    [email],
  );
  return rows[0] || null;
}

async function findByEmailWithPassword(email) {
  const { rows } = await database.query(
    'SELECT id, nombre, email, "contraseña" AS "passwordHash", fecha_creacion, fecha_actualizacion FROM usuarios WHERE email = $1 LIMIT 1',
    [email],
  );
  return rows[0] || null;
}

async function create({ nombre, email, passwordHash }) {
  const { rows } = await database.query(
    `INSERT INTO usuarios (nombre, email, "contraseña")
     VALUES ($1, $2, $3)
     RETURNING ${publicColumns}`,
    [nombre, email, passwordHash],
  );
  return rows[0];
}

async function update(id, fields) {
  const columnNames = {
    nombre: "nombre",
    email: "email",
    passwordHash: '"contraseña"',
  };
  const entries = Object.entries(fields);
  const assignments = entries.map(
    ([field], index) => `${columnNames[field]} = $${index + 1}`,
  );
  const values = entries.map(([, value]) => value);

  const { rows } = await database.query(
    `UPDATE usuarios
     SET ${assignments.join(", ")}, fecha_actualizacion = CURRENT_TIMESTAMP
     WHERE id = $${values.length + 1}
     RETURNING ${publicColumns}`,
    [...values, id],
  );
  return rows[0] || null;
}

async function remove(id) {
  const result = await database.query("DELETE FROM usuarios WHERE id = $1", [id]);
  return result.rowCount > 0;
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  findByEmailWithPassword,
  create,
  update,
  remove,
};
