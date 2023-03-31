import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../../type/RespostaPadraoMsg';
import type { CadastroRequisicao } from '../../../type/CadastroRequisicao';
import {UsuarioModel} from '../../../models/UsuarioModel';
import {conectarMongoDB} from '../../../middlewares/conectarMongoDB';
import md5 from 'md5';

const endpointCadastro = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

    if (req.method === 'POST') {
        const usuario = req.body as CadastroRequisicao;

        if (!usuario.nome || usuario.nome.length < 3) {
            return res.status(400).json({ erro: 'Nome invalido' });
        }

        if (!usuario.email || usuario.email.length < 5
            || !usuario.email.includes("@")
            || !usuario.email.includes(".")) {
            return res.status(400).json({ erro: 'Email invalido' });
        }

        if (!usuario.senha || usuario.senha.length < 8){
            return res.status(400).json({ erro: 'Senha Invalida' });
        }

        // validacao se ja existe usuario com o mesmo email
        const usuarioComMesmoEmail = await UsuarioModel.find({email : usuario.email});
        if(usuarioComMesmoEmail && usuarioComMesmoEmail.length > 0){
            return res.status(400).json({erro : 'Email ja cadastrado!'})
        }

        //Salva banco de dados
        const usuarioASerSalvo = {
            nome : usuario.nome,
            email : usuario.email,
            senha : md5(usuario.senha),
        }
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({msg : 'Cadastro criado com sucesso'});  
    }
    return res.status(405).json({erro : 'Metodo Informado Invalido'});
}

export default conectarMongoDB(endpointCadastro);