/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import jwt from '../system/jwt/JsonWebTokenSystem'

import ScheduleMessageController from '../controllers/ScheduleMessageController'
import InformationController from '../controllers/InformationController'
import LoginController from '../controllers/LoginController'
import TestController from '../controllers/TestController'

import { Router } from 'express'

export default class ControllersRoute{
    constructor(routes:Router) {
        
        /** Endpoint de informações */
        routes.get('/', new InformationController().info)

        /** Endpoint Login para obter token */
        routes.post('/login', new LoginController().login)

        /** Endpoint Agendamento */
        routes.post('/agendamento', jwt.checkTokenAuth, new ScheduleMessageController().agendamento)

        /** Endpoint Consultar Agendamentos */
        routes.get('/consultar', jwt.checkTokenAuth, new ScheduleMessageController().consultar)

        /** Endpoint Consultar Agendamentos Removidos */
        routes.get('/consultar_removidos', jwt.checkTokenAuth, new ScheduleMessageController().consultar_removidos)

        /** Endpoint Remover Agendamento */
        routes.put('/remover', jwt.checkTokenAuth, new ScheduleMessageController().remover)

        /** Endpoint Recuperar Agendamento */
        routes.put('/recuperar', jwt.checkTokenAuth, new ScheduleMessageController().recuperar)

        /** Endpoint de teste */
        routes.get('/test', jwt.checkTokenAuth, new TestController().Test)
        
    }
}