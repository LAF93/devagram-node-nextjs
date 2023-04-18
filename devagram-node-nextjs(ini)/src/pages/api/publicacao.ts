import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../../type/RespostaPadraoMsg';
import type { updload, uploadImagemCosmic } from '../../../services/uploadImagemCosmic';
import nc from 'next-connect';

const handler = nc()
    .use(updload.single('file'))
    .post(async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

    });