import { NextApiRequest, NextApiResponse } from "next";
import { validarTokenJWT } from "../../../middlewares/validarTokenJWT";

const usurioEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json('Usuario Autenticado com sucesso');
}

export default usurioEndpoint