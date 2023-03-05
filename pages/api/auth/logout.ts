import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        const error = { error: 'Method not allowed' };
        return res.status(405).json(error);
    }
    deleteCookie('loggedInUser');
    res.json({ message: 'logout' });
}
