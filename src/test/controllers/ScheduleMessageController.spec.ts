// /**
//  * Developer Willian Takashi Ishida
//  * Criado:    2021-09-08
//  * Alterado:  -
//  */

import { Request, Response, Router } from 'express'
import ScheduleMessageController from '../../controllers/ScheduleMessageController'

describe('Schedule - Agendarmento', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject = {}


    beforeEach(() => {
        mockRequest = {
            body: {
                "id_user": 1,
                "date_schedule": "2021-09-08 08:00:00",
                "message": "Texto da mensagem a ser enviada",
                "destined": "test@test.com.br"
            }
        }
        mockResponse = {
            statusCode: 0,
            json: jest.fn().mockImplementation((result) => {
                responseObject = result
            })
        }
    })

    test('Agendamento', async () => {
        const expectedStatusCode = 201

        await new ScheduleMessageController().agendamento(mockRequest as Request, mockResponse as Response)
        console.log('Schedule - Agendarmento')
        console.log(JSON.stringify(responseObject))

        if (mockResponse.statusCode != 201)
            console.log(JSON.stringify(responseObject))

        expect(mockResponse.statusCode).toBe(expectedStatusCode)
    })

})

describe('Schedule - Consultar', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject = {}


    beforeEach(() => {
        mockRequest = {}
        mockResponse = {
            statusCode: 0,
            json: jest.fn().mockImplementation((result) => {
                responseObject = result
            })
        }
    })

    test('Consultar', async () => {
        const expectedStatusCode = 200

        await new ScheduleMessageController().consultar(mockRequest as Request, mockResponse as Response)

        console.log('Schedule - Consultar')
        console.log(JSON.stringify(responseObject))

        if (mockResponse.statusCode != 200)
            console.log(JSON.stringify(responseObject))

        expect(mockResponse.statusCode).toBe(expectedStatusCode)
    })

})

describe('Schedule - Remover', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject = {}


    beforeEach(() => {
        mockRequest = {
            body: {
                "id_user": 1,
                "id_schedule_message": 1
            }
        }
        mockResponse = {
            statusCode: 0,
            json: jest.fn().mockImplementation((result) => {
                responseObject = result
            })
        }
    })

    test('Remover', async () => {
        const expectedStatusCode = 200

        await new ScheduleMessageController().remover(mockRequest as Request, mockResponse as Response)

        console.log('Schedule - Remover')
        console.log(JSON.stringify(responseObject))

        if (mockResponse.statusCode != 200)
            console.log(JSON.stringify(responseObject))

        expect(mockResponse.statusCode).toBe(expectedStatusCode)
    })

})

describe('Schedule - Consultar Removidos', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject = {}


    beforeEach(() => {
        mockRequest = {}
        mockResponse = {
            statusCode: 0,
            json: jest.fn().mockImplementation((result) => {
                responseObject = result
            })
        }
    })

    test('Consultar Removidos', async () => {
        const expectedStatusCode = 200

        await new ScheduleMessageController().consultar_removidos(mockRequest as Request, mockResponse as Response)

        console.log('Schedule - Consultar Removidos')
        console.log(JSON.stringify(responseObject))

        if (mockResponse.statusCode != 200)
            console.log(JSON.stringify(responseObject))

        expect(mockResponse.statusCode).toBe(expectedStatusCode)
    })

}) 

describe('Schedule - Recuperar', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject = {}


    beforeEach(() => {
        mockRequest = {
            body: {
                "id_user": 1,
                "id_schedule_message": 1
            }
        }
        mockResponse = {
            statusCode: 0,
            json: jest.fn().mockImplementation((result) => {
                responseObject = result
            })
        }
    })

    test('Recuperar', async () => {
        const expectedStatusCode = 200

        await new ScheduleMessageController().recuperar(mockRequest as Request, mockResponse as Response)

        console.log('Schedule - Recuperar')
        console.log(JSON.stringify(responseObject))

        if (mockResponse.statusCode != 200)
            console.log(JSON.stringify(responseObject))

        expect(mockResponse.statusCode).toBe(expectedStatusCode)
    })

})
