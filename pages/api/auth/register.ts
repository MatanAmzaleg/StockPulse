import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import { setCookie } from 'cookies-next';
// import bcrypt from 'bcrypt';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') sendError(res, 'wrong method');

    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName)
        sendError(res, 'Please provide an email and password');

    try {
        // const hashedPassword = await bcrypt.hash(password, 10);

        const userCred = {
            email,
            fullName,
            // password: hashedPassword,
            password,
            coins: 5000,
            currencies: {},
        };

        const user: UserDocument = await User.create(userCred);

        if (!user) sendError(res, 'Cannot create user');

        setCookie('loggedInUser', user.email, {
            req,
            res,
            maxAge: 1000 * 60 * 4,
            path: '/',
        });

        res.json(user);
    } catch (error) {
        console.log(error);
        sendError(res, 'Not able to create a new user.');
    }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
    return res.status(status).json({ error });
}
