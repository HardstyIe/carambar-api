import rateLimit from 'express-rate-limit';

// Rate limiter pour l'API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Max 100 requêtes par IP
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter strict pour la création de blagues
export const createJokeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 100, // Max 10 créations par heure
  message: {
    success: false,
    message: 'Too many jokes created from this IP, please try again later.'
  }
});
