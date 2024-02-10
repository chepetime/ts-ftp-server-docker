import { startFtpServer } from "./ftp-server";
import { startFileWatcher } from "./file-watcher";
import { prepareEnvironment } from "./utils/prep-env";
import { VERSION } from "./constants";

async function startServer() {
  console.log(`FTP SERVER v${VERSION}`);
  await prepareEnvironment();
  startFtpServer();
  startFileWatcher();
}

startServer();
