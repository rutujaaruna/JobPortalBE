import { NextFunction, Request, Response } from 'express';
import ResumeRepository from '../services/resume.service';
import selfPDF from '../utils/invoiceTemplate';

export default class resumeController {
  static generateResume = async(req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Hiiiiii');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selfPDF.generateResume(function(err: any) {
        if (err) {
          res.send({ status: 400, data: err });
        } else {
          setTimeout(function() {
            res.send({ status: 200, message: 'Resume Generated Successfully' });
          }, 3000);
        }
      });
    } catch (err) {
      next(err);
    }
  };
}