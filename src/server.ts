import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './config/database';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/security';
import JokeModel from './models/joke';
import jokeRoutes from './routes/jokeRoutes';
import { joke } from './utils/jokeData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
};

// middlewares
app.use(helmet());// header security
app.use('/api/', apiLimiter);// Rate limiting global
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(errorHandler);
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
  
  // Auto-seed si BDD vide
  const jokeCount = await JokeModel.count();
  if (jokeCount === 0) {
    console.log('🌱 Database empty, seeding with initial jokes...');
    await JokeModel.bulkCreate(joke);
    console.log(`✅ ${joke.length} jokes inserted automatically`);
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api/${API_VERSION}/jokes`);
  });
};

startServer();
