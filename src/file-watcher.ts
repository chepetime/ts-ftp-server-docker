import chokidar from "chokidar";
import { promises as fs } from "fs";
import { FTP_ROOT_DIR } from "./constants";
import * as path from "path";
import * as XLSX from "xlsx";

const CHOKIDAR_CONFIG = {
  ignored: /^\./,
  persistent: true,
};

const isAcceptableFile = (filePath: string): boolean => {
  const validExtensions = [".csv", ".xlsx"];
  const extension = path.extname(filePath);
  return validExtensions.includes(extension);
};

const convertXlsxToCsv = async (filePath: string) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const csvFilePath = filePath.replace(/\.xlsx$/, ".csv");
  await fs.writeFile(csvFilePath, csv);
  console.log(`Converted ${filePath} to ${csvFilePath}`);
  return csvFilePath;
};

const handleFileAdd = async (filePath: string) => {
  try {
    if (!isAcceptableFile(filePath)) {
      console.log(`Ignored file ${filePath}, will be deleted.`);
      await fs.unlink(filePath);
      console.log(`Deleted ${filePath}`);
      return;
    }

    // Proceed with checking the file size for acceptable files
    const stats = await fs.stat(filePath);
    if (stats.size > 0) {
      if (path.extname(filePath) === ".xlsx") {
        console.log(`Processing an Excel file: ${filePath}`);
        await convertXlsxToCsv(filePath);
        await fs.unlink(filePath);
        console.log(`Deleted original Excel file ${filePath}`);
      } else {
        // Process CSV file directly
        const content = await fs.readFile(filePath, "utf8");
        // @TODO: Process CSV File content
        console.log(`Read content from ${filePath}:`, content);
      }

      // Assuming deletion of the CSV file after processing
      await fs.unlink(filePath);
      console.log(`Deleted ${filePath}`);
    } else {
      console.log(`File ${filePath} is empty, will be deleted.`);
      await fs.unlink(filePath);
      console.log(`Deleted empty file ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error}`);
  }
};

const handleError = (error: string) => {
  console.error(`Watcher error: ${error}`);
};

export function startFileWatcher() {
  const watcher = chokidar.watch(FTP_ROOT_DIR, CHOKIDAR_CONFIG);

  watcher.on("add", handleFileAdd).on("error", handleError);
  console.log(`Watching for changes in ${FTP_ROOT_DIR}`);
}
