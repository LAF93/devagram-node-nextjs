import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';
import type {RespostaPadraoMsg} from '../type/RespostaPadraoMsg';

export const conectarMongoDB = (handle: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

        // verficair se o banco ja esta conectado, se estiver seguir para o endpoint ou proximo middleware
        if (mongoose.connections[0].readyState) {
            return handle(req, res);
        }

        // ja que nao esta conectado vamos conectar
        //obter a variavel de ambiemte preenchida da env
        const { DB_CONEXAO_STRING } = process.env;

        //se a env estiver vazia aborta o uso do sistema e avisa o programador
        if (!DB_CONEXAO_STRING) {
            return res.status(500).json({ erro: 'ENV de configuração do banco, não informado' });
        }

        mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));
        mongoose.connection.on('error', erro => console.log(`ocorreu erro ao conectar no banco: ${erro}`));
        await mongoose.connect(DB_CONEXAO_STRING);

        //agora posso seguir para o endpoint, pois estou conectado
        //no banco
        return handle(req, res);
    }