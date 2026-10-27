const hitos = require("../models/hitos");

const textFields = {
  codigo_linea_tiempo: 50,
  descripcion: 255,
  texto: null,
  foto: 255,
  video: 255,
  voz: 255,
};

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseIdentifier(value) {
  if (/^[1-9]\d*$/.test(value)) {
    const id = Number(value);
    return Number.isSafeInteger(id) && id <= 2147483647 ? id : null;
  }
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 50
    ? value
    : null;
}

function validateFields(body, requireAll) {
  const fields = {};

  for (const [field, maxLength] of Object.entries(textFields)) {
    const value = body[field];
    if (value === undefined) {
      if (requireAll) {
        throw httpError(400, `${field} es obligatorio`);
      }
      continue;
    }
    if (
      typeof value !== "string" ||
      !value.trim() ||
      (maxLength !== null && value.trim().length > maxLength)
    ) {
      const limit = maxLength === null ? "" : ` de hasta ${maxLength} caracteres`;
      throw httpError(400, `${field} debe ser un texto no vacío${limit}`);
    }
    fields[field] = value.trim();
  }

  if (body.orden === undefined) {
    if (requireAll) {
      throw httpError(400, "orden es obligatorio");
    }
  } else if (
    !Number.isInteger(body.orden) ||
    body.orden <= 0 ||
    body.orden > 32767
  ) {
    throw httpError(400, "orden debe ser un entero positivo");
  } else {
    fields.orden = body.orden;
  }

  if (
    fields.codigo_linea_tiempo !== undefined &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.codigo_linea_tiempo)
  ) {
    throw httpError(
      400,
      "codigo_linea_tiempo solo admite minúsculas, números y guiones",
    );
  }

  return fields;
}

async function list(req, res) {
  res.json(await hitos.findAll());
}

async function get(req, res) {
  const identifier = parseIdentifier(req.params.identifier);
  if (identifier === null) {
    throw httpError(400, "El identificador del hito no es válido");
  }

  const hito = await hitos.findByIdentifier(identifier);
  if (!hito) {
    throw httpError(404, "Hito no encontrado");
  }
  res.json(hito);
}

async function create(req, res) {
  const hito = await hitos.create(validateFields(req.body, true));
  res.status(201).json(hito);
}

async function update(req, res) {
  const identifier = parseIdentifier(req.params.identifier);
  if (identifier === null) {
    throw httpError(400, "El identificador del hito no es válido");
  }

  const fields = validateFields(req.body, false);
  if (Object.keys(fields).length === 0) {
    throw httpError(400, "Debe enviar al menos un campo para actualizar");
  }

  const hito = await hitos.update(identifier, fields);
  if (!hito) {
    throw httpError(404, "Hito no encontrado");
  }
  res.json(hito);
}

async function remove(req, res) {
  const identifier = parseIdentifier(req.params.identifier);
  if (identifier === null) {
    throw httpError(400, "El identificador del hito no es válido");
  }
  if (!(await hitos.remove(identifier))) {
    throw httpError(404, "Hito no encontrado");
  }
  res.status(204).end();
}

module.exports = { list, get, create, update, remove };
