import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour créer le dossier si nécessaire
const createDirectoryIfNotExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Créez les dossiers nécessaires
const logsDirectory = path.join(__dirname, '..', 'logs');
createDirectoryIfNotExists(logsDirectory);

// Destructure winston's format module
const { combine, timestamp, printf, colorize } = winston.format;

// Define the log format using a custom printf function
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Define the format for console output including enriched information
const consoleFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let logInfo = `${timestamp} ${level}: ${message}`;
  if (Object.keys(metadata).length > 0) {
    logInfo += `\n${JSON.stringify(metadata, null, 2)}`;
  }
  return logInfo;
});

// Create a new logger instance with specified configuration
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Transport to write logs to a daily rotating file
    new DailyRotateFile({
      filename: path.join(logsDirectory, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD', // Date format in file name
      zippedArchive: true, // Archive previous log files
      maxSize: '5m', // Maximum size of a log file
      maxFiles: '5d', // Maximum number of log files to keep
    }),
    // Transport to log messages to the console (useful during development)
    new winston.transports.Console({
      format: combine(
        colorize(),
        consoleFormat
      ),
      level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
    }),
    // Transport to handle errors
    new winston.transports.File({
      filename: path.join(logsDirectory, 'error.log'),
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    // Transport to handle uncaught exceptions
    new winston.transports.File({
      filename: path.join(logsDirectory, 'exceptions.log'),
    }),
  ],
});

export default logger;
