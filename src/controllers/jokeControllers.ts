import { NextFunction, Request, Response } from 'express';
import { sequelize } from '../config/database';
import JokeModel from '../models/joke';

export class JokeController {
  static async getAllJokes(req: Request, res: Response, next: NextFunction) {
    try {
      const jokes = await JokeModel.findAll();
      
      return res.status(200).json({
        success: true,
        count: jokes.length,
        data: jokes
      });
    } catch (error) {
      next(error);
    }
  }

  static async getJokeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({
        success: false,
        message: 'Invalid ID'
        });
      } 

      const jokeId = parseInt(id, 10);

      if (isNaN(jokeId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ID'
        });
      }

      const joke = await JokeModel.findByPk(jokeId);
      
      if (!joke) {
        return res.status(404).json({
          success: false,
          message: 'Joke not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: joke
      });

    } catch (error) {
      next(error);
    }
  }

  static async getRandomJoke(req: Request, res: Response, next: NextFunction) {
    try {
      const joke = await JokeModel.findOne({
        order: sequelize.random() // choisir une blague au hasard
      });

      if (!joke) {
        return res.status(404).json({
          success: false,
          message: 'No jokes available'
        });
      }

      return res.status(200).json({
        success: true,
        data: joke
      });
    } catch (error) {
      next(error);
    }
  }

  static async createJoke(req: Request, res: Response, next: NextFunction) {
    try {
      const { question, answer } = req.body;

      if (!question || !answer) {
        return res.status(400).json({
          success: false,
          message: 'Question and answer required'
        });
      }

      const newJoke = await JokeModel.create({ question, answer });

      return res.status(201).json({
        success: true,
        message: 'Joke created',
        data: newJoke
      });

    } catch (error) {
      next(error);
    }
  }
}
