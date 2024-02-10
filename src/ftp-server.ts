import FtpSrv from "ftp-srv";

import {
  BLACKLIST,
  FTP_PASSWORD,
  FTP_ROOT_DIR,
  FTP_USERNAME,
  HOSTNAME,
  PASV_PORT_END,
  PASV_PORT_START,
  PASV_URL,
  PORT,
  WHITELIST,
} from "./constants";

const ftpServer = new FtpSrv({
  url: `ftp://${HOSTNAME}:${PORT}`,
  anonymous: false,

  pasv_url: PASV_URL,
  pasv_min: PASV_PORT_START,
  pasv_max: PASV_PORT_END,
});

ftpServer.on("login", ({ connection, username, password }, resolve, reject) => {
  const clientIp = connection.ip;

  if (BLACKLIST.includes(clientIp)) {
    return reject(new Error("Your IP address is blacklisted."));
  }
  if (WHITELIST.length > 0 && !WHITELIST.includes(clientIp)) {
    return reject(new Error("Your IP address is not whitelisted."));
  }

  if (username === FTP_USERNAME && password === FTP_PASSWORD) {
    resolve({ root: FTP_ROOT_DIR });
  } else {
    return reject(new Error("Invalid username or password."));
  }
});

export function startFtpServer() {
  ftpServer.listen().then(() => {
    console.log(`FTP Server started on ftp://${HOSTNAME}:${PORT}`);
  });
}
