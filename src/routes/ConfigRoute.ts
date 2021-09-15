/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

/* +++ INICIO BIBLIOTECAS */
import * as express from 'express'
import cookieParser from 'cookie-parser'
/* +++ FIM BIBLIOTECAS */

/* +++ INICIO ROTAS */
const routes = express.Router()

/* cookie */
routes.use(cookieParser())

import AssetsRoute from './AssetsRoute'
new AssetsRoute(routes)

import ControllersRoute from './ControllersRoute'
new ControllersRoute(routes)

import JwtRoute from './JwtRoute'
new JwtRoute(routes)

import SwaggerRoute from './SwaggerRoute'
new SwaggerRoute(routes)

export default routes