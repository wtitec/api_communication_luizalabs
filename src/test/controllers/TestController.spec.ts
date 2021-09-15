// /**
//  * Developer Willian Takashi Ishida
//  * Criado:    2021-09-08
//  * Alterado:  -
//  */

import { Request, Response, Router } from 'express'
import TestController from '../../controllers/TestController'

describe('Test', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject = {}
    

    beforeEach(() => {
        mockRequest = {}
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation((result) => {
                responseObject = result
            })
        }
    })

    test('200 - Test', async () => {
        const expectedStatusCode = 200

        await new TestController().Test(mockRequest as Request, mockResponse as Response)

        console.log (JSON.stringify(responseObject))

        if (mockResponse.statusCode != 200)
            console.log (JSON.stringify(responseObject))  

        expect(mockResponse.statusCode).toBe(expectedStatusCode)
    })
    
});
