import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../../services/back/db.service";
import User, { UserDocument } from "../../../../model/user.schema";

connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, crypto } = req.body;
  console.log(email, "sell crypto", crypto);

  try {
    console.log("selling crypto");

    const user: UserDocument | null = await User.findOne({
      email,
    });
    if (!user) {
      return sendError(res, "User not found", 404);
    }

    if(!user.currencies[crypto.currency]) return

    else {
      console.log("found");


      if (user.currencies[crypto.currency] === crypto.amount) {
        delete user.currencies[crypto.currency]
        console.log("deleting");
      } else {
        console.log(
          "amount: ",
          user.currencies[crypto.currency]
        );
        user.currencies[crypto.currency] -= crypto.amount;

        console.log(
          "amount: ",
          user.currencies[crypto.currency],
        );
      }
    }
    // await User.updateOne({ email }, { $set: { user } });
    await user.save();
    console.log(user);

    res.status(200).json({ message: "Transaction added successfully" }); // Return a success response
  } catch (error) {
    return sendError(res, (error as Error).message);
  }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
  return res.status(status).json({ error });
}
