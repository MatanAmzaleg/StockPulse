import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import { sendError } from 'next/dist/server/api-utils';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') sendError(res, 405, 'Method not allowed');
    const { email } = req.query;

    if (!email) sendError(res, 400, 'Please provide an email');

    try {
        const user: UserDocument | null = await User.findOne({ email });
        if (!user) sendError(res, 400, 'Cannot find user');
        console.log(user);

        res.json(user);
    } catch (error) {
        sendError(res, 500, 'Unable to find user');
    }
}
