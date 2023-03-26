import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import { sendError } from 'next/dist/server/api-utils';

connect();

export default async function handler(
    { method, query, body }: NextApiRequest,
    res: NextApiResponse
) {
    const { email } = query;
    if (!email) sendError(res, 400, 'Please provide an email');

    if (method === 'GET') {
        try {
            const user: UserDocument | null = await User.findOne({ email });
            if (!user) sendError(res, 400, 'Cannot find user');
            console.log(user);

            res.json(user);
        } catch (error) {
            sendError(res, 500, 'Unable to find user');
        }
    } else if (method === 'POST') {
        const { symbol } = body;

        if (!symbol) sendError(res, 400, 'Please provide a symbol');

        const user: UserDocument | null = await User.findOneAndUpdate(
            { email },
            { $push: { watchlist: symbol } },
            { new: true }
        );
        console.log(user);

        res.json('ok');
    } else {
        sendError(res, 405, 'Method not allowed');
    }
}
