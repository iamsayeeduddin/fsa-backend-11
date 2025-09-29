import bunyan from "bunyan";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appLoggerFilePath = path.join(__dirname, "..", "logs", "app.log");

export const appLogger = bunyan.createLogger({
  name: "FSA_LOGGER",
  streams: [{ path: appLoggerFilePath }],
});
