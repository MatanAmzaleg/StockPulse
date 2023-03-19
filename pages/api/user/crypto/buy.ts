import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../../services/back/db.service";
import User, { UserDocument } from "../../../../model/user.schema";

connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, crypto } = req.body;
  console.log(email, crypto);

  try {
    const user: UserDocument | null = await User.findOne({
      email,
    });
    if (!user) {
      return sendError(res, "User not found", 404);
    }
    if (!user.currencies[crypto.currency]) {
      user.currencies[crypto.currency] = crypto.amount;
      return;
    } else {
      user.currencies[crypto.currency] += crypto.amount;
    }

    await user.save(); // Save the updated user object
    res.status(200).json({ message: " successfully buyed crypto" }); // Return a success response
  } catch (error) {
    return sendError(res, (error as Error).message);
  }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
  return res.status(status).json({ error });
}
