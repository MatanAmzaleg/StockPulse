import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import { setCookie } from 'cookies-next';
import { sendError } from 'next/dist/server/api-utils';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') sendError(res, 405, 'Method not allowed');
    const { email, password } = req.body;

    if (!email || !password)
        sendError(res, 400, 'Please provide an email and password');

    try {
        // const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // if (!isPasswordCorrect) {
        //     res.status(400).json({ error: 'Incorrect password' });
        //     return;
        // }
        const user: UserDocument | null = await User.findOne({
            email,
            password,
        });

        if (!user) sendError(res, 400, 'Cannot find user');

        setCookie('loggedInUser', user!.email, {
            req,
            res,
            maxAge: 1000 * 60 * 4,
            path: '/',
        });

        res.json(user);
    } catch (error) {
        sendError(res, 500, 'Unable to log in');
    }
}
