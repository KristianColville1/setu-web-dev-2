import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import * as fs from "fs";

/**
 * Initializes and returns a LowDB store for the given data type.
 * @param {string} dataType - The type of data to store (used as filename and key).
 * @returns {Low} The initialized LowDB instance.
 */
export function initStore(dataType) {
  const store = {
    file: `./src/models/data/${dataType}.json`,
    [dataType]: [],
  };
  const db = new Low(new JSONFile(store.file));
  if (!fs.existsSync(store.file)) {
    fs.writeFileSync(store.file, JSON.stringify(store));
  }
  return db;
}
