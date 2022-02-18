const { ipcRenderer } = require("electron");

/* 
  eror handling for ipcMain.handle
  https://github.com/electron/electron/issues/24427
*/

function encodeError(e) {
  return { name: e.name, message: e.message, extra: { ...e } };
}

function decodeError({ name, message, extra }) {
  const e = new Error(message);
  e.name = name;
  Object.assign(e, extra);
  return e;
}

module.exports = {
  encodeError,
  decodeError,
};
