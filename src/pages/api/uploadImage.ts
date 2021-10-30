import { NextApiRequest, NextApiResponse } from 'next';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  cloudinary.uploader.upload(req.body, (error: any, result: any) => {
    if (!error) {
      return res.status(200).json({
        message: 'ok',
        url: result.secure_url,
      });
    } else {
      return res.status(400).json({ message: 'error', error });
    }
  });
}
