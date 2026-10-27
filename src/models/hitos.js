const database = require("../config/database");

const columns = `
  id,
  codigo_linea_tiempo,
  descripcion,
  texto,
  foto,
  video,
  voz,
  orden
`;

async function findAll() {
  const { rows } = await database.query(
    `SELECT ${columns} FROM hitos ORDER BY orden`,
  );
  return rows;
}

async function findByIdentifier(identifier) {
  const isId = Number.isInteger(identifier);
  const column = isId ? "id" : "codigo_linea_tiempo";
  const { rows } = await database.query(
    `SELECT ${columns} FROM hitos WHERE ${column} = $1`,
    [identifier],
  );
  return rows[0] || null;
}

async function create(fields) {
  const { rows } = await database.query(
    `INSERT INTO hitos (
       codigo_linea_tiempo, descripcion, texto, foto, video, voz, orden
     ) VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING ${columns}`,
    [
      fields.codigo_linea_tiempo,
      fields.descripcion,
      fields.texto,
      fields.foto,
      fields.video,
      fields.voz,
      fields.orden,
    ],
  );
  return rows[0];
}

async function update(identifier, fields) {
  const columnNames = {
    codigo_linea_tiempo: "codigo_linea_tiempo",
    descripcion: "descripcion",
    texto: "texto",
    foto: "foto",
    video: "video",
    voz: "voz",
    orden: "orden",
  };
  const entries = Object.entries(fields);
  const assignments = entries.map(
    ([field], index) => `${columnNames[field]} = $${index + 1}`,
  );
  const values = entries.map(([, value]) => value);
  const isId = Number.isInteger(identifier);
  const identifierColumn = isId ? "id" : "codigo_linea_tiempo";

  const { rows } = await database.query(
    `UPDATE hitos SET ${assignments.join(", ")}
     WHERE ${identifierColumn} = $${values.length + 1}
     RETURNING ${columns}`,
    [...values, identifier],
  );
  return rows[0] || null;
}

async function remove(identifier) {
  const isId = Number.isInteger(identifier);
  const column = isId ? "id" : "codigo_linea_tiempo";
  const result = await database.query(
    `DELETE FROM hitos WHERE ${column} = $1`,
    [identifier],
  );
  return result.rowCount > 0;
}

module.exports = { findAll, findByIdentifier, create, update, remove };
