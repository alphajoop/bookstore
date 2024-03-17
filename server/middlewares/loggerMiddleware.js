// Supprimez l'importation de chalk dans votre fichier de configuration de journal
import logger from '../config/logger.js';

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  let requestType = '';
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Mozilla')) {
    requestType = 'WEB';
  } else if (req.headers['user-agent'] && req.headers['user-agent'].includes('PostmanRuntime')) {
    requestType = 'API';
  } else {
    requestType = 'OTHER';
  }

  logger.info(
    `${requestType} ${req.method} ${req.url} ${req.ip} Content-Type: ${JSON.stringify(req.headers['content-type'] || 'Not specified')}`
  );

  // Gestion des erreurs dans le middleware
  try {
    // Exécuter la requête
    next();
  } catch (error) {
    // Capturer et journaliser les erreurs
    logger.error(`Error occurred: ${error.message}`);
    // Passer l'erreur au gestionnaire d'erreurs global
    next(error);
  } finally {
    const end = Date.now();
    const duration = end - start; // Calculer la durée de la requête en millisecondes
    logger.info(`Request duration: ${duration}ms`);
  }
};

export default loggerMiddleware;
