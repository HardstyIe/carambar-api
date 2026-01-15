import express from 'express';
import jokeRoutes from './jokeRoutes';

const router = express.Router();

// allow all routes to start with /jokes (e.g., /jokes, /jokes/:id, /jokes/random)
router.use('/jokes', jokeRoutes);

export default router;
