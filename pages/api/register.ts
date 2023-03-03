import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../services/back/db.service';
import User, { UserDocument } from '../../model/user.schema';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        req.body.coins = 500;
        console.log('bodyyyyyyyy', req.body);

        const user: UserDocument = await User.create(req.body);

        console.log('userrrrrrrrrr', user);

        res.redirect('/');
        if (!user) {
            return res.json({ code: 'User not created' });
        }
    } catch (error) {
      console.log(error);
      
        res.status(400).json({ status: 'Not able to create a new user.' });
    }
}
