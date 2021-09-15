/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { JWT } from '../config/jwt'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

class JsonWebTokenSystem {
  /**
   *
   * Login
   *
   * @param req recebe parametros do cliente
   * @param res retorna um json para o cliente
   *
   * JSON de request { "username":"biometrika_faces","password":"QrK5ub42WMa2jnQG" }
   *
   */
  public async Token(req: Request, res: Response) {
    // username e password request
    const username = req.body.username
    const password = req.body.password

    if (username && password) {
      // compara se JWT.usename e JWT.password da aplicação bate com o que recebeu no JSON
      if (username in JWT.users && password === JWT.users[username].password) {
        // JWT seus parametros estão no arquivo config/Jwt
        const token = jwt.sign({ username: username },
          JWT.key,
          {
            expiresIn: JWT.users[username].expires // expira em 24 horas
          }
        )
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token,
        })
      } else {
        const msg = 'Username ou password incorretos!'
        // se o usename e password não for a da aplicação retorna Forbidden
        res.status(403).send({ status: 2, message: msg })
      }
    } else {
      const msg = 'Informe username e password!'
      res.status(400).send({ status: 1, message: msg })
    }
  }

  /**
   *
   * checkTokenAuth
   *
   * @param req recebe parametros do cliente
   * @param res retorna um json para o cliente
   * @param next se for confirmado a autenticação é liberado ser usado a aplicação
   *
   */
  public async checkTokenAuth(req: Request, res: Response, next: NextFunction) {
    // tokek recebe da authorization: Bearer o token
    let token = <string>req.headers['x-access-token'] || <string>req.headers.authorization

    // verifica se existe token na header
    if (token) {
      // verifica se existe na string o argumento Bearer
      if (token.startsWith('Bearer ')) {
        // retira da variabel 'Bearer ' e deixa somento o token
        token = token.slice(7, token.length)
      }
      // verifica o webtoken se é válido
      jwt.verify(token, JWT.key, (err:any) => {
        if (err) {
          // se não for válido o token retorna o erro especifico
          res.status(401).send({ status: 1, err })
        } else {
          // se for confirmado a autenticação é liberado ser usado a aplicação
          next()
        }
      })
    } else {
      const msg = "Bad Request header 'authorization: Bearer ' não foi fornecido!"
      // retorna se não for fornecido na header a authorization
      res.status(400).send({ status: 3, msg })
    }
  }

  /**
   *
   * checkTokenUrl
   *
   * @param req recebe parametros do cliente
   * @param res retorna um json para o cliente
   * @param next se for confirmado a autenticação é liberado ser usado a aplicação
   *
   */
  public async checkTokenUrl(req: Request, res: Response, next: NextFunction) {
    // tokek recebe pela url o token
    const token = req.params.token

    // verifica se existe token na header
    if (token) {
      // verifica o webtoken se é válido
      jwt.verify(token, JWT.key, (err:any) => {
        if (err) {
          // se não for válido o token retorna o erro especifico
          res.status(401).send({ status: 1, err })
        } else {
          // se for confirmado a autenticação é liberado ser usado a aplicação
          next()
        }
      })
    } else {
      const msg = "Request header 'authorization: Bearer ' não foi fornecido!"
      // retorna se não for fornecido na header a authorization
      res.json({
        status: 2,
        message: msg
      })
    }
  };

  /**
   *
   * checkTokenCrypto
   *
   * @param req recebe parametros do cliente
   * @param res retorna um json para o cliente
   * @param next se for confirmado a autenticação é liberado ser usado a aplicação
   *
   */
  public async checkTokenCrypto(req: Request, res: Response, next: NextFunction) {
    let token = req.params.token

    // verifica se existe token na header
    if (token) {
      // verifica se existe na string o argumento Bearer
      if (token.startsWith('Bearer ')) {
        // retira da variabel 'Bearer ' e deixa somento o token
        token = token.slice(7, token.length)
      }
      // verifica o webtoken se é válido
      jwt.verify(token, JWT.key, (err:any) => {
        if (err) {
          // se não for válido o token retorna o erro especifico
          res.status(401).send({ status: 1, err })
        } else {
          // se for confirmado a autenticação é liberado ser usado a aplicação
          next()
        }
      })
    } else {
      const msg = "Request header 'authorization: Bearer ' não foi fornecido!"
      // retorna se não for fornecido na header a authorization
      res.json({
        status: 2,
        message: msg
      })
    }

  }

  /**
   *
   * default
   *
   * @param req recebe parametros do cliente
   * @param res retorna um json para o cliente
   * @param next se for confirmado a autenticação é liberado ser usado a aplicação
   *
   */
  public async default(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
      console.log(err)
      return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
  }

  /**
   *
   * checkTokenUrlSwagger
   *
   * @param req recebe parametros do cliente
   * @param res retorna um json para o cliente
   * @param next se for confirmado a autenticação é liberado ser usado a aplicação
   *
   */
  public async checkTokenUrlSwagger(req: Request, res: Response, next: NextFunction) {
    // tokek recebe pela url o token
    const token = req.params.token

    // verifica se existe token na header
    if (token) {
      // verifica o webtoken se é válido
      jwt.verify(token, JWT.key, (err:any) => {
        if (err) {
          // se não for válido o token retorna o erro especifico
          res.redirect("/swagger-login")
        } else {
          // se for confirmado a autenticação é liberado ser usado a aplicação
          next()
        }
      })
    } else {
      const msg = "Request header 'authorization: Bearer ' não foi fornecido!"
      // retorna se não for fornecido na header a authorization
      res.redirect("/swagger-login")
    }
  };

  /**
   *
   * local
   *
   * @param req recebe parametros do cliente
   * @param res retorna um json para o cliente
   * @param next se for confirmado a autenticação é liberado ser usado a aplicação
   *
   */
  public local() {

    const username = "local"

    const token = jwt.sign({ username: username },
      JWT.key,
      {
        expiresIn: JWT.users[username].expires // expira em 24 horas
      }
    )

    // retorna para o cliente a estrutua abaixo de JSON
    return token
  }

}

export default new JsonWebTokenSystem()
