import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface Joke{
  id: number;
  question: string;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JokeCreation {
  question: string;
  answer: string;
}

class JokeModel extends Model< Joke, JokeCreation > {
  declare id: number
  declare question: string
  declare answer: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

JokeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'jokes',
    timestamps: true,
  }
)

export default JokeModel;
