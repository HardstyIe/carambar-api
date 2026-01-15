import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './config/database';
import { logger } from './config/logger';
import { swaggerSpec } from './config/swagger';
import { apiLimiter } from './middlewares/security';
import jokeRoutes from './routes/jokeRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

// middlewares
app.use(helmet());// header security
app.use('/api/', apiLimiter);// Rate limiting global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health-check (check if server is running)
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     description: Check if the API server is running
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Server is running"
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes for jokes api
app.use(`/api/${API_VERSION}/jokes`, jokeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const startServer = async () => {
  await connectDatabase();
  
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
    logger.info(`📡 API: http://localhost:${PORT}/api/${API_VERSION}/jokes`);
  });
};

startServer();
