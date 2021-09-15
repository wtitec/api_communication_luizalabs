/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

export default interface ScheduleMessage {
    id_schedule_message: string
    
    id_user: number
    
    date_schedule: Date
    
    message: string

    destined: string

    status: number
    
    created: Date
    
    modify: Date
    
}

const table = 'schedule_message_tbl'

export const DB = {
    Add: {
        Query: `INSERT INTO\
               ${table}\
               (id_user, date_schedule, message, destined)\
               VALUES (?, CONVERT_TZ(?,'-03:00','+00:00'), ?, ?)`,
        TypeValues: {
            id_user: 'number',
            date_schedule: 'string',
            message: 'string',
            destined: 'string'
        },
        Values: ['id_user', 'date_schedule', 'message', 'destined']
    },
    Remove: {
        Query: `UPDATE\
               ${table}\
               SET status = 1 WHERE id_schedule_message = ?`,
        TypeValues: {
            id_schedule_message: 'number'
        },
        Values: ['id_schedule_message']
    },
    Active: {
        Query: `UPDATE\
               ${table}\
               SET status = 0 WHERE id_schedule_message = ?`,
        TypeValues: {
            id_schedule_message: 'number'
        },
        Values: ['id_schedule_message']
    },
    GetSchedule: {
        Query: `SELECT *\
                FROM  ${table}\
                WHERE status = 0\
                LIMIT 10`,
        TypeValues: {},
        Values: []
    },
    GetScheduleRemove: {
        Query: `SELECT *\
                FROM  ${table}\
                WHERE status = 1\
                LIMIT 10`,
        TypeValues: {},
        Values: []
    }
}