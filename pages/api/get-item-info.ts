// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_KEY = process.env.NEOPLE_API_KEY;
  const {
    query: { itemId },
    method,
  } = req;

  if (method !== 'GET') {
    res.status(405).end({message: `Method ${method} Not Allowed.`});
    return;
  }

  if (!itemId) {
    res.status(400).end({message: `itemId는 반드시 입력되어야 합니다.`});
    return;
  }

  try {
    const { data } = await axios.get(`https://api.neople.co.kr/df/items/${itemId}?apikey=${API_KEY}`);
    res.status(200).json(data?.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({message: `알 수 없는 오류가 발생했습니다.`});
  }
}
