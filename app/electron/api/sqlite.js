const { app } = require("electron");

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const errorHandler = require("../utils/error");
const { updateShorthandPropertyAssignment } = require("typescript");

let db = null;
const filesPayloadKeys = [
  "id",
  "title",
  "type",
  "source",
  "category",
  "provider",
  "link",
  "downloadStatus",
  "progress",
  "desc",
  "uploadedAt",
  "size",
  "folderPath",
];

const torrentsPayloadKeys = [
  "id",
  "infoHash",
  "magnetUri",
  "createdAt",
  "createdBy",
  "comment",
];

async function openDB() {
  db = await open({
    driver: sqlite3.Database,
    filename: `${app.getPath("userData")}/files.db`,
  });

  db.exec(`CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    title TEXT,
    type TEXT,
    source TEXT,
    category TEXT,
    provider TEXT,
    link TEXT,
    downloadStatus TEXT,
    progress INTEGER,
    desc TEXT,
    uploadedAt TEXT,
    size TEXT,
    folderPath TEXT
  )`);

  db.exec(`CREATE TABLE IF NOT EXISTS torrents (
    id INTEGER PRIMARY KEY,
    fileId TEXT,
    infoHash TEXT,
    magnetUri TEXT,
    createdAt TEXT,
    createdBy TEXT,
    comment TEXT,
    FOREIGN KEY(fileId) REFERENCES files(id)
  )`);
}

async function closeDB() {
  await db.close();
}

function tableFieldErrorLogger(key) {
  // TODO: add error logger of non existing field
  if (!filesPayloadKeys.includes(key) && !torrentsPayloadKeys.includes(key)) {
    console.log(`${key} field is not exist on table files and torrent`);
  }
}

function filesQueryValueBuilder(payload) {
  let columns = "";
  let values = "";

  for (const key in payload) {
    if (filesPayloadKeys.includes(key)) {
      columns += `${key}, `;
      if (typeof payload[key] === "string") {
        values += `'${payload[key]}', `;
      } else {
        values += `${payload[key]}, `;
      }
    } else {
      tableFieldErrorLogger(key);
    }
  }

  columns = columns.trim().slice(0, columns.length - 2);
  values = values.trim().slice(0, values.length - 2);

  return { columns, values };
}

function torrentsQueryValueBuilder(payload) {
  let columns = "";
  let values = "";

  for (const key in payload) {
    if (torrentsPayloadKeys.includes(key)) {
      if (key === "id") {
        columns += "fileId, ";
        values += `'${payload.id}', `;
      } else {
        columns += `${key}, `;
        if (typeof payload[key] === "string") {
          values += `'${payload[key]}', `;
        } else {
          values += `${payload[key]}, `;
        }
      }
    } else {
      tableFieldErrorLogger(key);
    }
  }

  columns = columns.trim().slice(0, columns.length - 2);
  values = values.trim().slice(0, values.length - 2);

  return { columns, values };
}

async function insertNewFile(payload) {
  try {
    const { columns, values } = filesQueryValueBuilder(payload);
    await db.exec(`INSERT INTO files (${columns}) VALUES (${values})`);

    return { result: "success" };
  } catch (error) {
    throw new Error(errorHandler(error));
  }
}

async function insertNewTorrent(payload) {
  try {
    const { columns: fileColumns, values: fileValues } =
      filesQueryValueBuilder(payload);
    const { columns: torrentColumns, values: torrentValues } =
      torrentsQueryValueBuilder(payload);
    await db.exec(`INSERT INTO files (${fileColumns}) VALUES (${fileValues})`);
    await db.exec(
      `INSERT INTO torrents (${torrentColumns}) VALUES (${torrentColumns})`
    );

    return { result: "success" };
  } catch (error) {
    throw new Error(errorHandler(error));
  }
}

async function updateTorrent(payload) {
  try {
  } catch (error) {}
}

module.exports = {
  openDB,
  closeDB,
  insertNewFile,
  insertNewTorrent,
};
