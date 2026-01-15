import { sequelize } from '../config/database';
import JokeModel from '../models/joke';
import { joke } from './jokeData';

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    await sequelize.sync({ force: true });
    console.log('✅ Tables created');
    
    await JokeModel.bulkCreate(joke);
    console.log(`✅ ${joke.length} jokes inserted`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();
