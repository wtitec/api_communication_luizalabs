/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { createServer, Server as ServerHTTP } from 'http'
import express from 'express'
import cors from 'cors'

import routes from '../../routes/ConfigRoute'
import { server as serverConf } from '../config/Config'


class Express {

    /* Porta de conexão do servidor, parametros em ./system/config/config */
    public static readonly PORT: string | number = process.env.PORT || serverConf.port;

    /* Parametro referencia de aplicação do EXPRESS */
    public express: express.Application

    /* Parametro referencia de HTTP Server */
    private serverhttp: ServerHTTP | undefined

    constructor() {
        /* Atribuindo funcionalidades EXPRESS */
        this.express = express()

        /* Função de acesso, entrada e saida */
        this.middlewares()

        /* Função de acesso servidor */
        this.listen()

        /* Função de Rotas de entrada */
        this.routes()
    }

    private middlewares(): void {
        /* acesso externo */
        this.express.use(cors())

        /* entrada de JSON */
        this.express.use(express.json())
        /* limite do tamanho do json */
        this.express.use(express.json({ "limit": "5mb" }))

        /**
         * Esta é uma função de middleware integrada no Express.
         * Ele veicula arquivos estáticos e é baseado em veicular estático
         **/
        this.express.use(express.static(__dirname))

        /** 
         * Esta é uma função que analisa as solicitações recebidas com cargas úteis
         * codificadas por url e é baseado no analisador de corpo.
         **/
        this.express.use(express.urlencoded({ "extended": true }))
    }

    private listen(): void {

        /**
         * Criando conexão sem credenciais se não houver
         * parametros definido ao servidor onde a aplicação vai rodar
         * */
        this.serverhttp = createServer(this.express)

        /* Servidor escutando na porta definida na ./system/config/config */
        this.serverhttp.listen(serverConf.port)


        console.log('Http server listing on port: ' + serverConf.port)
    }

    /* Rotas para uso de Requesições REST */
    private routes(): void {
        this.express.use(routes)
    }
}

export default new Express().express