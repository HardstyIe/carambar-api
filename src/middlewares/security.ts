import rateLimit from 'express-rate-limit';

// API rate limiter 
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // max 1000 request per 15 minutes
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// rate limiter for creating jokes
export const createJokeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 100, // max 100 joke creation per hour
  message: {
    success: false,
    message: 'Too many jokes created from this IP, please try again later.'
  }
});
