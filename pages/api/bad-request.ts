// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string | string[],
  ok: boolean,
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    const {message='Ocurrio un error por un bad request.'} = req.query;
    res.status(400).json({ ok:false, message })
}
