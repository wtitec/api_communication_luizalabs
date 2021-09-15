/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { Request, Response } from 'express'
import JWT from '../system/jwt/JsonWebTokenSystem'
import md5 from 'md5'
import TestModel from '../models/TestModel'
import User from '../models/entity/Users'


class LoginController {
    /**
    *   @swagger
    *   components:
    *   schemas:
    *       Login:
    *           type: object
    *           required:
    *               - usuario
    *               - senha
    *           properties:
    *               usuario:
    *                   type: string
    *                   description: Usuario
    *               senha:
    *                   type: string
    *                   description: Senha
    *           example:
    *               usuario: 'wtitec@swagger'
    *               senha: '123456'
    */

    /**
    *   @swagger
    *   tags:
    *       name: Login
    *       description:
    */

    /**
     *  @swagger
     *  /login:
     *      post:
     *          summary: Login Token
     *          description:
     *              <h2>Login retornando token</h2>
     *              <p>Obter token para acesso aos endpoint.</p>
     *          tags: [Login]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Login'
     *          responses:
     *              "200":
     *                  description:
     *                      <p>Exemplo do Retorno.</p>
     *                  content:
     *                      application/json:
     *                          schema:
     *                              example:
     *                                  status: 0
     *                                  token: 'jwt token'
     */

    public async login(req: Request, res: Response) {
        const token = JWT.local()

        const usuario = req.body.usuario.toLocaleLowerCase()
        const senha = md5(req.body.senha)

        const data: any = await TestModel.GetUser({
            username: usuario
        })

        const dados: User = data.results[0]

        if (dados.password === senha) {
            res.cookie('auth', token);
            res.statusCode = 200
            res.json({ "status": 0, "token": token });
        } else {
            res.statusCode = 401
            res.json({ "status": 1, "error": "Usuário ou Senha incorretos!" })
        }

    }
}

export default LoginController