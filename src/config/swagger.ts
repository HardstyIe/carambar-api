import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carambar Jokes API',
      version: '1.0.0',
      description: 'API for Carambar jokes - CDA Project',
    },
    servers: [
  {
    url: 'http://localhost:3000',
    description: 'Development server'
  },
  {
    url: 'https://ton-url-render.onrender.com', //TODO; a changer par l'url de production
    description: 'Production server'
  }
],
  },
  apis: ['./src/routes/*.ts', './src/server.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
