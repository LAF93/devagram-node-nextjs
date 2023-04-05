import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../../type/RespostaPadraoMsg';
import type { CadastroRequisicao } from '../../../type/CadastroRequisicao';
import { UsuarioModel } from '../../../models/UsuarioModel';
import { conectarMongoDB } from '../../../middlewares/conectarMongoDB';
import { updload, uploadImagemCosmic } from "../../../services/uploadImagemCosmic";
import md5 from 'md5';
import nc from 'next-connect';

const handler = nc()
    .use(updload.single('file'))
    .post(async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
        const usuario = req.body as CadastroRequisicao;

        if (!usuario.nome || usuario.nome.length < 3) {
            return res.status(400).json({ erro: 'Nome invalido' });
        }

        if (!usuario.email || usuario.email.length < 5
            || !usuario.email.includes("@")
            || !usuario.email.includes(".")) {
            return res.status(400).json({ erro: 'Email invalido' });
        }

        const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
        if(!usuario.senha || usuario.senha.length < 8 || !specialChars.test(usuario.senha)){
            return res.status(400).json({erro: 'Senha inválida. A senha deve conter pelo menos um caracter especial (!@#$%^&*(),.?":{}|<>)'});
          }

        // validacao se ja existe usuario com o mesmo email
        const usuarioComMesmoEmail = await UsuarioModel.find({ email: usuario.email });
        if (usuarioComMesmoEmail && usuarioComMesmoEmail.length > 0) {
            return res.status(400).json({ erro: 'Email ja cadastrado!' })
        }

        //enviar a imagem do multer para cosmic
        const image = await uploadImagemCosmic(req);

        //Salva banco de dados
        const usuarioASerSalvo = {
            nome: usuario.nome,
            email: usuario.email,
            senha: md5(usuario.senha),
            avatar: image?.media?.url,
        }
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({ msg: 'Cadastro criado com sucesso' });
    });

export const config = {
    api: {
        bodyParser: false
    }
}

export default conectarMongoDB(handler);