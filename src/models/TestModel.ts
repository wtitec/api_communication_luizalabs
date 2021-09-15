/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { Connection } from 'mysql';
import Database, { database, database as db, types_validation } from '../system/DataBase/ConfigDatabase'
import Users, { DB } from './entity/Users'

export default new class TestsModel {

    public async Add(json: any) {

        const [validate, values, errors] = types_validation(DB.Add.Values, DB.Add.TypeValues, json);

        if (validate) {
            try {
                const query = new Promise(function (resolve) {
                    const conDB = Database
                    conDB.DB(db.antares.server, db.antares.db)
                    const con: Connection = conDB.mysqlConnection()
                    con.query({
                        sql: DB.Add.Query,
                        values: values,
                        timeout: database.query.timeout
                    }, function (err: any, results: any) {
                        if (err) {
                            con.destroy()
                            resolve({
                                status: 1,
                                msg: "Erro!",
                                err: err
                            })
                        } else {
                            con.destroy()
                            resolve({
                                status: 0,
                                msg: "Dados Inseridos!",
                                results: results
                            })
                        }
                    })
                })
                let res: any = await query.then(result => result)
                return res
            } catch (error) {
                return {
                    status: -2,
                    msg: JSON.stringify(errors)
                }
            }

        } else {
            return {
                status: -1,
                msg: "Verifique os tipos enviados!",
                tipos: errors
            }
        }
    }

    public async GetUser(json: any) {

        const [validate, values, errors] = types_validation(DB.GetUser.Values, DB.GetUser.TypeValues, json);

        if (validate) {

            try {
                const query = await new Promise(function (resolve) {
                    const conDB = Database
                    conDB.DB(db.antares.server, db.antares.db)
                    const con: Connection = conDB.mysqlConnection()
                    con.query({
                        sql: DB.GetUser.Query,
                        values: values,
                        timeout: database.query.timeout
                    }, function (err: any, results: any) {
                        if (err) {
                            con.destroy()
                            resolve({
                                status: 1,
                                msg: "Erro!",
                                err: err
                            })
                        } else {
                            con.destroy()
                            resolve({
                                status: 0,
                                msg: "Dados Coletatos!",
                                results: results
                            })
                        }
                    })
                }).then(result => result)

                let res: any = await query
                return res
            } catch (error) {
                return {
                    status: -2,
                    msg: JSON.stringify(errors)
                }
            }

        } else {
            return {
                status: -1,
                msg: "Verifique os tipos enviados!",
                tipos: errors
            }
        }
    }

}

// CONVERT_TZ('2021-09-12 01:55:00','-03:00','+00:00')