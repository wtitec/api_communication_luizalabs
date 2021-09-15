/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

 import * as dotenv from "dotenv";
 dotenv.config();
 
export const server = {
    "name_app": "API COMMUNICATION LUIZALABS",
    "version": "1.0.0",
    "port": 3000
} 
 
 export const environment:string = process.env.NODE_ENV || "production"
 