import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  info: {
    title: 'Express Template',
    version: '0.1.0',
    description: 'Express Template API definitions.',
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [{ url: 'http://localhost:4000/api' }],
  security: [{ bearerAuth: [] }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['src/main/models/*.model.ts', 'src/main/controllers/*.controller.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

export default specs;
