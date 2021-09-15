/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

import { Request, Response } from 'express'
import InformationController from '../../controllers/InformationController'

describe('API Information', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject = {}

    beforeEach(() => {
        mockRequest = {  }
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation((result) => {
                responseObject = result
            })
        }
    })

    test('200 - API Information', async () => {
        const expectedStatusCode = 200
        const expectedReponse = {
            app: 'API COMMUNICATION LUIZALABS',
            author: 'WTI',
            version: '1.0.0'

        }

        new InformationController().info(mockRequest as Request, mockResponse as Response)

        expect(mockResponse.statusCode).toBe(expectedStatusCode)
        expect(responseObject).toEqual(expectedReponse)
    })
})