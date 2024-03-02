import multer, { diskStorage } from 'multer';
import { Request } from 'express';
import fs from 'fs';
import path from 'path';
import randomString from 'randomstring';
import logger from '../logger';


// Function to generate a random string
function generateRandomString(length: number, charset: string): string {
  return randomString.generate({
    length: length,
    charset: charset,
  });
}

// Create the multer storage
export const uploadDoc = multer({
  storage: diskStorage({
    destination(req: Request, file: Express.Multer.File, cb) {

      let destinationFolder = '';

      if (req.body.dest) {
        const dest = req.body.dest;
        destinationFolder = path.join('public', 'uploads', dest); //destination will be dynamically generated by body data
      }

      // Ensure the destination folder exists or create it if it doesn't
      if (!fs.existsSync(destinationFolder)) {
        fs.mkdirSync(destinationFolder, { recursive: true });
      }
      cb(null, destinationFolder);
    },
    filename: async(req: Request, file: Express.Multer.File, cb) => {
      try {
        const extension = path.extname(file.originalname);
        const randomString = generateRandomString(10, 'alphabetic');
        const newFileName = randomString.concat(extension);
        req.body.newFileName = newFileName;
        cb(null, newFileName);
      } catch (error) {
        logger.error(error);
      }
    },
  }),
});

