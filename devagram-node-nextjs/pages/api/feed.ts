import { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import { validarTokenJWT } from "../../middlewares/validarTokenJWT";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';

const feedEndpoint = (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {
    try {
        
    } catch (e) {
        console.log(e);
        res.status(400).json({erro : 'Não foi possivel obert feed'});
    }
}

export default validarTokenJWT(conectarMongoDB(feedEndpoint));