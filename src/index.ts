import { startFtpServer } from "./ftp-server";
import { startFileWatcher } from "./file-watcher";
import { prepareEnvironment } from "./utils/prep-env";
import { FTP_ROOT_DIR, PASV_URL, VERSION } from "./constants";

async function startServer() {
  console.log(``);
  console.log(`FTP SERVER v${VERSION}`);
  console.log(`PASV_URL: ${PASV_URL}`);
  console.log(`FTP_ROOT_DIR: ${FTP_ROOT_DIR}`);
  await prepareEnvironment();
  startFtpServer();
  startFileWatcher();
}

startServer();
