import { sequelize } from '../config/database';
import { logger } from '../config/logger';
import JokeModel from '../models/joke';

const jokes = [
  { 
    question: "Quelle est la femelle du hamster ?", 
    answer: "L'Amsterdam" 
  },
  { 
    question: "Que dit un oignon quand il se cogne ?", 
    answer: "Aïe" 
  },
  { 
    question: "Quel est l'animal le plus heureux ?", 
    answer: "Le hibou, parce que sa femme est chouette." 
  },
  { 
    question: "Pourquoi le football c'est rigolo ?", 
    answer: "Parce que Thierry en rit" 
  },
  { 
    question: "Quel est le sport le plus fruité ?", 
    answer: "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes." 
  },
  { 
    question: "Que se fait un Schtroumpf quand il tombe ?", 
    answer: "Un Bleu" 
  },
  { 
    question: "Quel est le comble pour un marin ?", 
    answer: "Avoir le nez qui coule" 
  },
  { 
    question: "Qu'est ce que les enfants usent le plus à l'école ?", 
    answer: "Le professeur" 
  },
  { 
    question: "Quel est le sport le plus silencieux ?", 
    answer: "Le para-chuuuut" 
  },
  { 
    question: "Quel est le comble pour un joueur de bowling ?", 
    answer: "C'est de perdre la boule" 
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ Database connected');
    
    await sequelize.sync({ force: true });
    logger.info('✅ Tables created');
    
    await JokeModel.bulkCreate(jokes);
    logger.info(`✅ ${jokes.length} jokes inserted`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();
