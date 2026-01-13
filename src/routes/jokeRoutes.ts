import express from 'express';
import { JokeController } from '../controllers/jokeControllers';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         question:
 *           type: string
 *           example: "Quelle est la femelle du hamster ?"
 *         answer:
 *           type: string
 *           example: "L'Amsterdam"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/jokes:
 *   get:
 *     summary: Get all jokes
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: List of all jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Joke'
 */
router.get('/', JokeController.getAllJokes);

/**
 * @swagger
 * /api/v1/jokes/random:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Joke'
 *       404:
 *         description: No jokes available
 */
router.get('/random', JokeController.getRandomJoke);

/**
 * @swagger
 * /api/v1/jokes/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Joke ID
 *     responses:
 *       200:
 *         description: Joke details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Joke not found
 *       400:
 *         description: Invalid ID
 */
router.get('/:id', JokeController.getJokeById);

/**
 * @swagger
 * /api/v1/jokes:
 *   post:
 *     summary: Create a new joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Pourquoi les poissons n'aiment pas jouer au tennis ?"
 *               answer:
 *                 type: string
 *                 example: "Parce qu'ils ont peur du filet"
 *     responses:
 *       201:
 *         description: Joke created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', JokeController.createJoke);

export default router;
