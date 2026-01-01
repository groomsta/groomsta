import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Groomsta API Documentation',
            version: '1.0.0',
            description: 'API Reference for Groomsta Backend (Authentication, Payments, Wallet, Payouts)',
            contact: {
                name: 'Groomsta Tech Team'
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development Server'
            },
            {
                url: 'https://api.groomsta.com',
                description: 'Production Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/modules/**/*.routes.ts', './src/modules/**/*.controller.ts'] // Path to files containing JSDoc
};

export const swaggerSpec = swaggerJSDoc(options);
