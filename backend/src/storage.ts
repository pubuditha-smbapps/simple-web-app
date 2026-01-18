import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "..", "data.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ todos: [], users: [] }, null, 2));
}

export function readDB() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    const defaultData = { todos: [], users: [] };
    writeDB(defaultData);
    return defaultData;
  }
}

export function writeDB(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
