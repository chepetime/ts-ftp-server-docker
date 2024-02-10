export const VERSION = process.env.VERSION || "none";
export const HOSTNAME = process.env.FTP_HOSTNAME || "0.0.0.0";
export const PORT = process.env.FTP_PORT || 21;
export const PASV_PORT_START = 30000;
export const PASV_PORT_END = 30009;
export const PASV_URL = process.env.FTP_PASV_URL;

export const FTP_ROOT_DIR = process.env.FTP_ROOT_DIR || "/tmp/ftp";
export const FTP_USERNAME = process.env.FTP_USERNAME || "ray-thoraces-thulium";
export const FTP_PASSWORD = process.env.FTP_PASSWORD || "]Ei?#k9g5?H=2jcXrp)=";

// IP Filtering setup
export const WHITELIST = process.env.IP_WHITELIST
  ? process.env.IP_WHITELIST.split(",")
  : [];
export const BLACKLIST = process.env.IP_BLACKLIST
  ? process.env.IP_BLACKLIST.split(",")
  : [];
