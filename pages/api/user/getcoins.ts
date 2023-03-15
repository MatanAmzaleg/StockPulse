import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User from '../../../model/user.schema'

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username } = req.query;

    

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        console.log("userrrrrrrrrrrrrsssssssssssss",user);
        
        const coins = user.coins; // assuming that the user document has a coins field
        return res.status(200).json({ coins });
    } catch (error) {
        return sendError(res, (error as Error).message);
    }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
    return res.status(status).json({ error });
}
