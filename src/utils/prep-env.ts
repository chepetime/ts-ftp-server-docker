import { existsSync } from "fs";
import { promises as fsPromises } from "fs";
import { FTP_ROOT_DIR } from "../constants";

export async function prepareEnvironment() {
  // Ensure the FTP root directory exists
  if (!existsSync(FTP_ROOT_DIR)) {
    await fsPromises.mkdir(FTP_ROOT_DIR, { recursive: true });
  }
  return true;
}
