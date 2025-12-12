import fs from "fs";
import path from "path";

const dataFolder = path.join(process.cwd(), "data");

export function readJSON(filename) {
  const fullPath = path.join(dataFolder, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}

export function writeJSON(filename, data) {
  const fullPath = path.join(dataFolder, filename);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}
