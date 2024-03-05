
import fs from 'fs';
import PdfPrinter from 'pdfmake';
import { Alignment, PageOrientation, TDocumentDefinitions } from 'pdfmake/interfaces';

export default class selfPDF {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static generateResume = async(callback: any) => {
    const FILE_LOCATION = process.env.FILE_LOCATION;
    const fileLocation = `${FILE_LOCATION}public/uploads/userid/${1}/`;

    if (!fs.existsSync(fileLocation)) {
      fs.mkdirSync(fileLocation, { recursive: true });
    }

    const fonts = {
      Roboto: {
        normal: FILE_LOCATION + 'public/fonts/times new roman.ttf',
        bold: FILE_LOCATION + 'public/fonts/times new roman bold.ttf',
        italics: FILE_LOCATION + 'public/fonts/times new roman italic.ttf',
        bolditalics: FILE_LOCATION + 'public/fonts/times new roman bold italic.ttf'
      }
    };

    const filename = `${1}_Resume`;

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      content:[
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Rutuja Vishnu Patil', fontSize: 20, alignment: 'center' as Alignment, margin: [0, 0, 0, 10] }]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [172, 172, 172],
            body: [
              [
                { text: 'Rutuja Vishnu Patil', fontSize: 20, alignment: 'center' as Alignment, margin: [0, 0, 0, 10] },
                { text: 'Rutuja Vishnu Patil', fontSize: 20, alignment: 'center' as Alignment, margin: [0, 0, 0, 10] },
                { text: 'Rutuja Vishnu Patil', fontSize: 20, alignment: 'center' as Alignment, margin: [0, 0, 0, 10] }
              ]
            ]
          },
          layout: 'noBorders'
        }
      ]
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(fileLocation + '/' + filename + '.pdf'));
    pdfDoc.end();
    callback();
  };
}