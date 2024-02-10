import { startFtpServer } from "./ftp-server";
import { startFileWatcher } from "./file-watcher";
import { prepareEnvironment } from "./utils/prep-env";

async function startServer() {
  await prepareEnvironment();
  startFtpServer();
  startFileWatcher();
}

startServer();
