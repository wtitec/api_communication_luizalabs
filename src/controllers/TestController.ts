/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { Request, Response } from 'express'
import TestModel from '../models/TestModel'


export default class TestController {

    public async Test(req: Request, res: Response) {
        const data: any = await TestModel.GetUser({
            username: 'wtitec@swagger'
        })

        let code:number

        if (('status' in data && data.status == -1) || 'err' in data) {
            res.statusCode = 400;
        } else {
            res.statusCode = 200;
        }
        res.send(data);
    }
}