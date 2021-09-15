/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */


import * as mysql from 'mysql'

class DatabaseMysqlSystem {

    private _host: string
    private _port: number
    private _tz: string
    private _user: string
    private _password: string
    private _database: string

    private _con: mysql.Connection

    public DB (server: string, database: string) {
        this[server](database)
    }

    public mysqlConnection() {
        this._con = mysql.createConnection({
            host: this._host,
            port: this._port,
            user: this._user,
            password: this._password,
            database: this._database,
            multipleStatements: true,
            timeout: 20000,
            bigNumberStrings: true,
            supportBigNumbers: true
        })

        this._con.connect(() => {
            try {
                console.log(`conected by id: ${this._con.threadId}`)
            } catch (error) {
                this._con.destroy()
                console.log(`error connect: ${JSON.stringify(error)}`)
            }
        })

        return this._con
    }

    public async query (Query:any, values:any) {
        return await new Promise(async function (resolve) {
            this._con.query({
                sql: Query,
                values: values,
                timeout: database.query.timeout
            }, function (err: any, results: any) {
                if (err) {
                    this._con.destroy()
                    resolve({
                        err: err
                    })
                } else {
                    this._con.destroy()
                    resolve({
                        results: results
                    })
                }
            })
        }).then(result => result)
    }

    private antares(database: string) {
        this._host = '10.5.0.6'
        this._port = 3306
        this._user = 'b7f638b6fb5397'
        this._password = '758ffee1'
        this._database = database
    }

    private aldebaran(database: string) {
        this._host = '10.5.0.7'
        this._port = 3306
        this._user = 'b0c600cdeb536d'
        this._password = '65d6f965'
        this._database = database
    }



}

export default new DatabaseMysqlSystem


export const database = {
    query: {
        timeout: 20000
    },
    antares: {
        server: 'antares',
        db: 'heroku_c9dfa0776bb7e16'
    },
    aldebaran: {
        server: 'aldebaran',
        db: 'heroku_d0dab3d35f538c2'
    }
}

export function types_validation(vals: any, type_map: object, json: object): [any[], any[], {}] {
    let type_validation = [];
    let values_temp = {};
    let values = []
    let errors = {};

    Object.keys(type_map).forEach((k, i) => {
        if (k in json) {
            let uf_type = typeof json[k] == type_map[k] || json[k] == null;
            type_validation.push(uf_type);
            values_temp[k] = json[k];
            if (uf_type == false) {
                errors[k] = `O argumento foi passado com tipo '${typeof json[k]}', está incorreto! Utilize tipo '${type_map[k]}'`;
            }
        } else {
            type_validation.push(false);
            values_temp[k] = undefined
            errors[k] = `Argumento indefinido. Verifique se o argumento está correto!`;
        }
    });
    // console.log(vals)
    vals.forEach((e: any) => {
        values.push(values_temp[e])
    });

    let validation: any = any(type_validation)

    return [validation, values, errors]
}


export function any(boolean_arr: boolean[]) {
    return boolean_arr.reduce((prev, curr) => {
        return prev && curr;
    }, true);
}