import type {NextApiRequest, NextApiResponse} from "next";
import { conectarMongoDB } from "../../../middlewares/conectaMongoDB";
import { RespostaPadraoMsg } from "../../../type/RespostaPadraoMsg";

const endpointLogin = (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;

        if(login === 'admin@admin.com' &&
            senha === 'Admin@123'){
                return res.status(200).json({msg : 'Usuario autenticado com sucesso'});
        }
        return res.status(405).json({erro : 'Usuario ou senha invalido'});
    }
    return res.status(405).json({erro : 'METODO INFORMADO NÂO E VALIDO'});
}

export default conectarMongoDB(endpointLogin);