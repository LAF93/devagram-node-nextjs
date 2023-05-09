import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import { conectarMongoDB } from "../../middlewares/conectarMongoDB";
import { validarTokenJWT } from "../../middlewares/validarTokenJWT";
import { politicaCORS } from "../../middlewares/politicaCORS";
import { UsuarioModel } from "../../models/UsuarioModel";

const pesquisaEndPoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any>) => {

    try {
        if (req.method === 'GET') {
            if (req?.query?.id) {
                const usuariosEncontrados = await UsuarioModel.findById(req?.query?.id);
                if (!usuariosEncontrados) {
                    return res.status(400).json({ erro: 'Usuario não encontrado' });
                }
                usuariosEncontrados.senha = null;
                return res.status(200).json(usuariosEncontrados);
            } else {
                const { filtro } = req.query;
                if (!filtro || filtro.length < 2) {
                    return res.status(400).json({ erro: 'Favor informar pelo menos 2 caracteres para a buscar' });
                }

                const usuariosEncontrados = await UsuarioModel.find({
                    // pesquisa por nome e email
                    $or: [{ nome: { $regex: filtro, $options: 'i' }},
                    //     {email : {$regex : filtro, $options: 'i'}}
                ]
                });

                return res.status(200).json(usuariosEncontrados);

            }
        }
        return res.status(405).json({ erro: 'Metodo informado nao e Valido' })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ erro: 'Não foi possivel buscar usuario' })
    }
}

export default politicaCORS(validarTokenJWT(conectarMongoDB(pesquisaEndPoint)));