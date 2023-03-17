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
    const currencyIdx = user.currencies.findIndex(
      (c) => c.currency === crypto.currency
    );
    
    if (currencyIdx < 0) return
    else {
        console.log("found");
        
      if (user.currencies[currencyIdx].amount === crypto.amount){
          delete user.currencies[currencyIdx];
        console.log("deleting");
        
      }
      else {
        user.currencies[currencyIdx].amount -= crypto.amount;
        user.currencies[currencyIdx].quantity -= crypto.quantity;
      }
      console.log(user);
      
    } 

    await user.save();
    res.status(200).json({ message: "Transaction added successfully" }); // Return a success response
  } catch (error) {
    return sendError(res, (error as Error).message);
  }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
  return res.status(status).json({ error });
}
