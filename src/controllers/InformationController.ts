/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { Request, Response } from 'express'

class InformationController {
    /**
     *   @swagger
     *   tags:
     *       name: Information
     *       description:
     */

    /**
     *  @swagger
     *  /:
     *      get:
     *          summary: Information
     *          description:
     *              <h2>Informações da API</h2>
     *              <p>Application, Author, Version.</p>
     *          tags: [Information]
     *          responses:
     *              "200":
     *                  description:
     *                      <p>Exemplo do Retorno.</p>
     *                  content:
     *                      application/json:
     *                          schema:
     *                              example:
     *                                  app: 'API COMMUNICATION LUIZALABS'
     *                                  author: 'WTI'
     *                                  version: '1.0.0' 
     */
    public async info(req: Request, res: Response) {
        res.statusCode = 200;
        res.send({
            app: 'API COMMUNICATION LUIZALABS',
            author: 'WTI',
            version: '1.0.0'

        });
    }
}

export default InformationController