import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type { RespostaPadraoMsg } from '../type/RespostaPadraoMsg';
import jwt, { JwtPayload } from "jsonwebtoken";

export const validarTokenJWT = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

        try {
            const { MINHA_CHAVE_JWT } = process.env;
            if (!MINHA_CHAVE_JWT) {
                return res.status(500).json({ erro: "ENV chave JWT nao informada na execução do projeto" });

            }

            if (!req || !req.headers) {
                return res.status(401).json({ erro: 'Não foi possivel Validar Token de acesso' });
            }

            if (req.method !== 'OPTIONS') {
                const authorization = req.headers['authorization'];
                if (!authorization) {
                    return res.status(401).json({ erro: 'Não foi possivel Validar Token de acesso' });
                }

                const Token = authorization.substring(7);
                if (!Token) {
                    return res.status(401).json({ erro: 'Não foi possivel Validar Token de acesso' });
                }

                const decoded = await jwt.verify(Token, MINHA_CHAVE_JWT) as JwtPayload;
                if (!decoded) {
                    return res.status(401).json({ erro: 'Não foi possivel Validar Token de acesso' });
                }

                if (!req.query) {
                    req.query = {};
                }

                req.query.userId = decoded._id;

            }

        } catch (e) {
            console.log(e);
            return res.status(401).json({ erro: 'Não foi possivel Validar Token de acesso' });

        }

        return handler(req, res);

    }