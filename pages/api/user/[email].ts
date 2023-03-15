import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') sendError(res, 'Method not allowed', 405);
    const { email } = req.query;

    if (!email) sendError(res, 'Please provide an email');

    try {
        const user: UserDocument | null = await User.findOne({ email });
        if (!user) sendError(res, 'Cannot find user');
        console.log(user);

        res.json(user);
    } catch (error) {
        sendError(res, 'Unable to find user', 500);
    }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
    return res.status(status).json({ error });
}
