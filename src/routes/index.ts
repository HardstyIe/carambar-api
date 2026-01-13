import express from 'express';
import jokeRoutes from './jokeRoutes';

const router = express.Router();

// permet de commencer toutes les routes de blagues avec /jokes
router.use('/jokes', jokeRoutes);

export default router;
