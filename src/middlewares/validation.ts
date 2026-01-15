import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

// middleware to handle validation errors
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg
      }))
    });
  }
  next();
};

// validation rule to create a new joke
export const validateCreateJoke = [
  body('question')
    .trim()
    .notEmpty().withMessage('Question is required')
    .isLength({ min: 3, max: 500 }).withMessage('Question must be between 3 and 500 characters')
    .escape(),
  body('answer')
    .trim()
    .notEmpty().withMessage('Answer is required')
    .isLength({ min: 1, max: 500 }).withMessage('Answer must be between 1 and 500 characters')
    .escape(),
  handleValidationErrors
];

// validation rule for joke ID parameter
export const validateJokeId = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors
];
