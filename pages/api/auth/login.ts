import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import { setCookie } from 'cookies-next';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') sendError(res, 'Method not allowed', 405);
    const { email, password } = req.body;

    if (!email || !password)
        sendError(res, 'Please provide an email and password');

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
        if (!user) sendError(res, 'Cannot find user');

        setCookie('loggedInUser', user!.email, {
            req,
            res,
            maxAge: 1000 * 60 * 4,
            path: '/',
        });

        res.json(user);
    } catch (error) {
        sendError(res, 'Unable to log in', 500);
    }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
    return res.status(status).json({ error });
}
