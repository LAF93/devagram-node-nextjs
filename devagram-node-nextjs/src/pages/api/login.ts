import type {NextApiRequest, NextApiResponse} from "next";
import { conectarMongoDB } from "../../../middlewares/conectarMongoDB";
import { RespostaPadraoMsg } from "../../../type/RespostaPadraoMsg";
import { UsuarioModel } from "../../../models/UsuarioModel";
import md5 from "md5";

const endpointLogin = async(
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;

        const usuariosEncontrados = await UsuarioModel.find({email : login, senha :md5(senha)});
        if(usuariosEncontrados && usuariosEncontrados.length > 0){
            const usuarioEncontrado = usuariosEncontrados [0];   
            return res.status(200).json({msg : `Usuario ${usuarioEncontrado.nome} autenticado com sucesso`});
        }
        return res.status(405).json({erro : 'Usuario ou senha invalido'});
    }
    return res.status(405).json({erro : 'METODO INFORMADO NÂO E VALIDO'});
}

export default conectarMongoDB(endpointLogin);