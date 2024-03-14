import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Destructure winston's format module
const { combine, timestamp, printf } = winston.format;

// Define the log format using a custom printf function
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a new logger instance with specified configuration
const logger = winston.createLogger({
  level: 'info', // Minimum logging level
  format: combine(
    timestamp(), // Add a timestamp to each log entry
    logFormat // Use the defined log format
  ),
  transports: [
    // Transport to write logs to a file
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'app.log'),
      maxsize: 5242880, // Maximum size of the log file (5MB)
      maxFiles: 5, // Maximum number of log files (rotation)
    }),
    // Transport to log messages to the console (useful during development)
    new winston.transports.Console(),
  ],
});

export default logger;
