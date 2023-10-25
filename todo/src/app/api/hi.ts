// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Respond with a simple JSON message
  res.status(200).json({ message: "Hello, World!" });
};
