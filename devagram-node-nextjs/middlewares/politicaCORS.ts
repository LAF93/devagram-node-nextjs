import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';
import NextCors from 'nextjs-cors';


export const politicaCORS = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
        try {

            await NextCors(req, res, {
                origin : '*',
                methods : ['PUT', 'GET', 'POST'],
                hander : ['x-api-token'],
                optionsSuccessStatus : 200, // navegador antiso dao problemas no 204
            });


            return handler(req, res);
        } catch (e) {
            console.log('Erro ao trata a politica de CORS:', e);
            return res.status(500).json({ erro: 'Ocorreu ao tratar a politica de CORS' });

        }

    }