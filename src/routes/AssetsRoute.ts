/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import express, { Router } from 'express'
import path from 'path'

export default class JwtRoute {
    constructor(routes: Router) {
        const dirname = path.join(__dirname, '../')
        /* Acesso aos arquivos js */
        routes.use('/css', express.static(dirname + '/app/css'))

        /* Acesso aos arquivos fonts */
        routes.use('/fonts', express.static(dirname + '/app/fonts'))

        /* Acesso aos arquivos js */
        routes.use('/js', express.static(dirname + '/app/js'))

        /* Acesso aos arquivos js */
        routes.use('/img', express.static(dirname + '/app/img'))

        /* Favicon */
        routes.get('/favicon.ico', (req, res) => {
            res.sendFile(dirname + '/app/img/favicon.ico')
        })
    }
}