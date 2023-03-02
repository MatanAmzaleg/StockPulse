import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../services/back/db.service';
import User, { UserDocument } from '../../model/user.schema';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const user: UserDocument = await User.create(req.body);
        res.redirect('/');
        if (!user) {
            return res.json({ code: 'User not created' });
        }
    } catch (error) {
        res.status(400).json({ status: 'Not able to create a new user.' });
    }
}
