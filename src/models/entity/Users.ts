export default interface User {
    id_user: number
    name: string
    lastname: string
    username: string
    password: string
    status: number
    type_user: number
    created: Date
    modify: Date
}

const table = 'user_tbl'

export const DB = {
    Add: {
        Query: `INSERT INTO\
               ${table}\
               (name, lastname, username, type_user)\
               VALUES (?, ?, ?, ?)`,
        TypeValues: {
            name: 'string',
            lastname: 'string',
            username: 'string',
            type_user: 'number'
        },
        Values: ['name', 'lastname', 'username', 'type_user']
    },
    Remove: {
        Query: `UPDATE\
               ${table}\
               SET status = 1 WHERE id_user = ?`,
        TypeValues: {
            id_user: 'number'
        },
        Values: ['id_user']
    },
    Active: {
        Query: `UPDATE\
               ${table}\
               SET status = 0 WHERE id_user = ?`,
        TypeValues: {
            id_user: 'number'
        },
        Values: ['id_user']
    },
    GetUser: {
        Query: `SELECT * \
                FROM  ${table}\
                WHERE username = ?`,
        TypeValues: {
            username: 'string'
        },
        Values: ['username']
    }
}