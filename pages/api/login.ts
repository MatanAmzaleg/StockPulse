import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../services/back/db.service";
import User, { UserDocument } from '../../model/user.schema';

connect();

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
const { email, password } = req.body;
try {
const user: UserDocument | null = await User.findOne({ email, password });
if (!user) {
return res.json({ status: "Not able to find the user" });
} else {
res.redirect("/home");
}
} catch (error) {
res.status(400).json({ status: "Not able to find the user" });
}
}