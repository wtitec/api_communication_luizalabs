/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import path from 'path'
import { Router } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import jwt from '../system/jwt/JsonWebTokenSystem'
import { environment } from '../system/config/Config'

class SwaggerRoute {
    
    constructor(routes: Router) {
        let local_apis: string;
        if (environment == "development") {
            local_apis = "./src/controllers/*.ts"
        } else {
            local_apis = "./dist/controllers/*.js"
        }

        local_apis = "./src/controllers/*.ts"

        const swaggerOptions = {
            definition: {

                openapi: "3.0.0",
                info: {
                    title: "API COMMUNICATION",
                    version: "1.0.0",
                    description: "API SERVER ENGINE ( LUIZA Labs )",
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                        }
                    }
                },
                security: [{
                    bearerAuth: []
                }],
                servers: [{ url: "http://localhost:3000" }],
            },
            apis: [local_apis],
        };

        const swaggerDocs = swaggerJsDoc(swaggerOptions);

        const location =  environment == 'production' ? '' : ''

        routes.use(`/api-docs/:token`, jwt.checkTokenUrlSwagger, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        routes.get(`/api-docs`, (req, res) => {
            if ("auth" in req.cookies) {
                res.redirect(`${location}/api-docs/${req.cookies.auth}/`)
            } else {
                res.redirect(`${location}/swagger-login`)
            }
        });

        routes.get(`/swagger-login`, (req, res) => {
            res.sendFile(path.join(__dirname,'../') + '/app/pages/swagger_login.html');
        })
    }
    
}

export default SwaggerRoute