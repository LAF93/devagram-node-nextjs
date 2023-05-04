import { NextApiRequest, NextApiResponse } from "next";
import { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";

const pesquisaEndPoint = (req: NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>)