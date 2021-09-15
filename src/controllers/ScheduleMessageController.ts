/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { Request, Response } from 'express'
import ScheduleMessageModel from '../models/ScheduleMessageModel'

export default class ScheduleMessageController {
    /**
    *   @swagger
    *   components:
    *   schemas:
    *       Agendamento:
    *           type: object
    *           required:
    *               - id_user
    *               - date_schedule
    *               - message
    *               - destined
    *           properties:
    *               id_user:
    *                   type: integer
    *                   description: ID user
    *               date_schedule:
    *                   type: string
    *                   description: Data do agendamento
    *               message:
    *                   type: string
    *                   description: Mensagem a ser enviada
    *               destined:
    *                   type: string
    *                   description: Destino da mensagem
    *           example:
    *               id_user: 1
    *               date_schedule: '2021-09-08 08:00:00'
    *               message: 'Texto da mensagem a ser enviada'
    *               destined: 'test@test.com.br'
    */

    /**
    *   @swagger
    *   tags:
    *       name: Agendamento
    *       description:
    */

    /**
     *  @swagger
     *  /agendamento:
     *      post:
     *          summary: Agendamento de mensagens
     *          description:
     *              <h2>Agendamento de mensagens</h2>
     *              <p>Agendar mensagens para envidos.</p>
     *          tags: [Agendamento]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Agendamento'
     *          responses:
     *              "201":
     *                  description:
     *                      <p>Exemplo do Retorno.</p>
     *                  content:
     *                      application/json:
     *                          schema:
     *                              example:
     *                                  status: 0
     *                                  msg: 'Dados Inseridos!'
     *                                  results:
     *                                      fieldCount: 0
     *                                      affectedRows: 1
     *                                      insertId: 5
     *                                      serverStatus: 2
     *                                      warningCount: 0
     *                                      message: ''
     *                                      protocol41: true
     *                                      changedRows: 0
     */


     public async agendamento(req: Request, res: Response) {
        let json:any
        let resSchedule:any
        try {
            json = {
                id_user: req.body.id_user,
                date_schedule:req.body.date_schedule,
                message: req.body.message,
                destined: req.body.destined
            }

            resSchedule = await ScheduleMessageModel.Add(json)

        } catch (error) {
            res.statusCode = 409
            res.json({
                status:-1,
                msg: JSON.stringify(error)
            });
        }
        res.statusCode = 201
        res.json(resSchedule)
    }

    /**
     *   @swagger
     *   tags:
     *       name: Agendamento
     *       description:
     */

    /**
     *  @swagger
     *  /consultar:
     *      get:
     *          summary: Consultar Agendamentos
     *          description:
     *              <h2>Consultar Agendamentos</h2>
     *              <p>Lista dos agendamentos ativos.</p>
     *          tags: [Agendamento]
     *          responses:
     *              "200":
     *                  description: Success
     * 
     */
    public async consultar(req: Request, res: Response) {
        let resSchedule:any
        try {
            resSchedule = await ScheduleMessageModel.Get()

        } catch (error) {
            res.statusCode = 400
            res.json({
                status:-1,
                msg: JSON.stringify(error)
            });
        }
        res.statusCode = 200
        res.json({
            status:0,
            result: resSchedule
        })
    }

    /**
     *   @swagger
     *   tags:
     *       name: Agendamento
     *       description:
     */

    /**
     *  @swagger
     *  /consultar_removidos:
     *      get:
     *          summary: Consultar Agendamentos Removidos
     *          description:
     *              <h2>Consultar Agendamentos Removidos</h2>
     *              <p>Lista dos agendamentos removido, ou seja, desativados.</p>
     *          tags: [Agendamento]
     *          responses:
     *              "200":
     *                  description: Success
     * 
     */
     public async consultar_removidos(req: Request, res: Response) {
        let resSchedule:any
        try {
            resSchedule = await ScheduleMessageModel.GetRemovidos()

        } catch (error) {
            res.statusCode = 400
            res.json({
                status:-1,
                msg: JSON.stringify(error)
            });
        }
        res.statusCode = 200
        res.json({
            status:0,
            result: resSchedule
        })
    }

    /**
    *   @swagger
    *   components:
    *   schemas:
    *       Remover:
    *           type: object
    *           required:
    *               - id_user
    *               - id_schedule_message
    *           properties:
    *               id_user:
    *                   type: integer
    *                   description: ID do usuario
    *               id_schedule_message:
    *                   type: integer
    *                   description: ID do Agendamento
    *           example:
    *               id_user: 1
    *               id_schedule_message: 1
    */

    /**
    *   @swagger
    *   tags:
    *       name: Agendamento
    *       description:
    */

    /**
     *  @swagger
     *  /remover:
     *      put:
     *          summary: Remover mensagens
     *          description:
     *              <h2>Remover Agendamentos</h2>
     *              <p>Remover agendamentos, ou seja, desativar.</p>
     *          tags: [Agendamento]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Remover'
     *          responses:
     *              "200":
     *                  description:
     *                      <p>Exemplo do Retorno.</p>
     *                  content:
     *                      application/json:
     *                          schema:
     *                              example:
     *                                  status: 0
     *                                  msg: 'Dados Coletados!'
     *                                  results: 
     *                                        status: 0
     *                                        msg: 'Mensagem agendada com sucesso!'
     */

     public async remover(req: Request, res: Response) {
        let json:any
        let resSchedule:any
        try {
            json = {
                id_user: req.body.id_user,
                id_schedule_message: req.body.id_schedule_message
            }

            resSchedule = await ScheduleMessageModel.Remove(json)

        } catch (error) {
            res.statusCode = 400
            res.json({
                status:-1,
                msg: JSON.stringify(error)
            });
        }
        res.statusCode = 200
        res.json({
            status:0,
            result: resSchedule
        })
    }

    /**
    *   @swagger
    *   components:
    *   schemas:
    *       Recuperar:
    *           type: object
    *           required:
    *               - id_user
    *               - id_schedule_message
    *           properties:
    *               id_user:
    *                   type: integer
    *                   description: ID do usuario
    *               id_schedule_message:
    *                   type: integer
    *                   description: ID do Agendamento
    *           example:
    *               id_user: 1
    *               id_schedule_message: 1
    */

    /**
    *   @swagger
    *   tags:
    *       name: Agendamento
    *       description:
    */

    /**
     *  @swagger
     *  /recuperar:
     *      put:
     *          summary: Recuperar mensagens removidas
     *          tags: [Agendamento]
     *          description:
     *              <h2>Recuperar Agendamentos Removidos</h2>
     *              <p>Recuperar agendamentos removido, ou seja, reativar.</p>
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Recuperar'
     *          responses:
     *              "200":
     *                  description:
     *                      <p>Exemplo do Retorno.</p>
     *                  content:
     *                      application/json:
     *                          schema:
     *                              example:
     *                                  status: 0
     *                                  msg: 'Dados Coletados!'
     *                                  results: 
     *                                        status: 0
     *                                        msg: 'Mensagem agendada com sucesso!'
     */

     public async recuperar(req: Request, res: Response) {
        let json:any
        let resSchedule:any
        try {
            json = {
                id_user: req.body.id_user,
                id_schedule_message: req.body.id_schedule_message
            }

            resSchedule = await ScheduleMessageModel.Active(json)

        } catch (error) {
            res.statusCode = 400
            res.json({
                status:-1,
                msg: JSON.stringify(error)
            });
        }
        res.statusCode = 200
        res.json({
            status:0,
            result: resSchedule
        })
    }
}