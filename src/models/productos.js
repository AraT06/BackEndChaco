const database = require("../config/database");

async function findAll() {
  const { rows } = await database.query(
    "SELECT id, titulo, descripcion, imagen, precio FROM productos ORDER BY id",
  );
  return rows;
}

async function findById(id) {
  const { rows } = await database.query(
    "SELECT id, titulo, descripcion, imagen, precio FROM productos WHERE id = $1",
    [id],
  );
  return rows[0] || null;
}

async function create({ titulo, descripcion, imagen, precio }) {
  const { rows } = await database.query(
    `INSERT INTO productos (titulo, descripcion, imagen, precio)
     VALUES ($1, $2, $3, $4)
     RETURNING id, titulo, descripcion, imagen, precio`,
    [titulo ?? null, descripcion ?? null, imagen ?? null, precio],
  );
  return rows[0];
}

async function update(id, fields) {
  const columnNames = {
    titulo: "titulo",
    descripcion: "descripcion",
    imagen: "imagen",
    precio: "precio",
  };
  const entries = Object.entries(fields);
  const assignments = entries.map(
    ([field], index) => `${columnNames[field]} = $${index + 1}`,
  );
  const values = entries.map(([, value]) => value);

  const { rows } = await database.query(
    `UPDATE productos SET ${assignments.join(", ")}
     WHERE id = $${values.length + 1}
     RETURNING id, titulo, descripcion, imagen, precio`,
    [...values, id],
  );
  return rows[0] || null;
}

async function remove(id) {
  const result = await database.query("DELETE FROM productos WHERE id = $1", [id]);
  return result.rowCount > 0;
}

module.exports = { findAll, findById, create, update, remove };
