/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import jwt from '../system/jwt/JsonWebTokenSystem'
import { Router } from 'express'

export default class JwtRoute {
    constructor(routes: Router) {
        /* Login enviar post json  */
        routes.post('/token', jwt.Token)
    }
}