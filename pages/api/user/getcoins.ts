import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import { sendError } from 'next/dist/server/api-utils';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username } = req.query;

    try {
        const user: UserDocument | null = await User.findOne({
            email: username,
        });
        if (!user) {
            return sendError(res, 404, 'User not found');
        }
        console.log('userrrrrrrrrrrrrsssssssssssss', user);

        const coins = user.coins; // assuming that the user document has a coins field
        return res.send(coins);
    } catch (error) {
        return sendError(res, 400, (error as Error).message);
    }
}
