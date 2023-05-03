import { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import { validarTokenJWT } from "../../middlewares/validarTokenJWT";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import { UsuarioModel } from "@/models/UsuarioModel";
import { PublicacaoModel } from "@/models/PublicacaoModel";

const feedEndpoint = async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg | any>) => {
    try {
        if(req.method === 'GET'){
            // receber uma informação do id do usuario
            // que eu quero buscar o feed
            // onde vem essa informação?
            if(req?.query?.id){
                // agora que tenho o id do usuario
                // como eu valido se o usuario valido
                const usuario = await UsuarioModel.findById(req?.query?.id);
                if(!usuario){
                    return res.status(400).json({erro : 'Usuario não encontrado'});
                }

                // e como eu busco as publicações dele?
                const publicações = await PublicacaoModel
                .find({idUsuario : usuario._id})
                .sort({data : -1});

                return res.status(200).json(publicações)
            }
        }
        return res.status(405).json({erro : 'Metodo Informado não e valido'});
    } catch (e) {
        console.log(e);
    }
    return res.status(400).json({erro : 'Não foi possivel obter feed'});
}

export default validarTokenJWT(conectarMongoDB(feedEndpoint));