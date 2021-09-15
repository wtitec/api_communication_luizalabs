/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { Connection } from 'mysql';
import Database, { database, database as db, types_validation } from '../system/DataBase/ConfigDatabase'
import ScheduleMessage, { DB } from './entity/ScheduleMessage'

export default new class ScheduleMessageModel {

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

    public async Remove(json: any) {

        const [validate, values, errors] = types_validation(DB.Remove.Values, DB.Remove.TypeValues, json);

        if (validate) {
            const query = new Promise(function (resolve) {
                const conDB = Database
                conDB.DB(db.antares.server, db.antares.db)
                const con: Connection = conDB.mysqlConnection()
                con.query({
                    sql: DB.Remove.Query,
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
                            msg: "Registro excluido!",
                            results: results
                        })
                    }
                })
            })
            let res: any = await query.then(result => result)
            return res
        } else {
            return {
                status: -1,
                msg: "Verifique os tipos enviados!",
                tipos: errors
            }
        }
    }

    public async Active(json: any) {

        const [validate, values, errors] = types_validation(DB.Active.Values, DB.Active.TypeValues, json);

        if (validate) {
            const query = new Promise(function (resolve) {
                const conDB = Database
                conDB.DB(db.antares.server, db.antares.db)
                const con: Connection = conDB.mysqlConnection()
                con.query({
                    sql: DB.Active.Query,
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
                            msg: "Registro Recuperado!",
                            results: results
                        })
                    }
                })
            })
            let res: any = await query.then(result => result)
            return res
        } else {
            return {
                status: -1,
                msg: "Verifique os tipos enviados!",
                tipos: errors
            }
        }
    }

    public async Get() {
        const [validate, values, errors] = types_validation([], {}, {});
        if (validate) {
            const query = await new Promise(function (resolve) {
                const conDB = Database
                conDB.DB(db.antares.server, db.antares.db)
                const con: Connection = conDB.mysqlConnection()
                con.query({
                    sql: DB.GetSchedule.Query,
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
        } else {
            return {
                status: -1,
                msg: "Verifique os tipos enviados!",
                tipos: errors
            }
        }

    }

    public async GetRemovidos() {
        const [validate, values, errors] = types_validation([], {}, {});
        if (validate) {
            const query = await new Promise(function (resolve) {
                const conDB = Database
                conDB.DB(db.antares.server, db.antares.db)
                const con: Connection = conDB.mysqlConnection()
                con.query({
                    sql: DB.GetScheduleRemove.Query,
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
        } else {
            return {
                status: -1,
                msg: "Verifique os tipos enviados!",
                tipos: errors
            }
        }

    }
}