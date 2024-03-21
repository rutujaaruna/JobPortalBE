
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
              [{ text: 'Rutuja Vishnu Patil', fontSize: 15, alignment: 'center' as Alignment, margin: [0, 0, 0, 0] }],
              [{ text: 'MEAN STACK DEVELOPER', fontSize: 15, alignment: 'center' as Alignment, margin: [0, 0, 0, 0], italics:true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [260, 260],
            body: [
              [
                { text: 'Email : rutujapatil978@gmail.com', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 0, 0, 0] },
                { text: 'Contact : 90826222566', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 0, 0, 0] }
              ],
              [
                { text: 'Address : Ganesh Krupa society room no:8 kandivali west mumbai-400067', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 0, 0, 0], colSpan:2 }
              ],
              [
                { text: 'Date Of Birth : 21/10/2000', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 0, 0, 10] },
                { text: 'Nationality : Indian', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 0, 0, 10] }
              ]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'rect', x: 0, y: 1, w: 530, h: 1, lineWidth: 0.5, color: '#FF0000' }]
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Profile', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'A personal CV profile should include details of your educational background, evidence of work experience, as well as your career aspirations.', fontSize: 10, margin: [0, 5, 0, 10] }]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Education', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [260, 260],
            body: [
              [
                { text: 'Bachelors of Science in Computer Science(B.Sc.CS),', fontSize: 10, margin: [0, 5, 0, 0] },
                { text: '06/2019-05/2022 | Mumbai,india', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 5, 0, 0] }
              ],
              [
                { text: 'Patkar Vardhe College', fontSize: 10, margin: [0, 0, 0, 0], colSpan:2 }
              ],
              [
                { text: 'Over all CGPA = 9.7', fontSize: 10, margin: [0, 0, 0, 0], colSpan:2 }
              ],
              [
                { text: 'HSC, Patkar Varde College', fontSize: 10, margin: [0, 10, 0, 0] },
                { text: '06/2018-05/2019 | Mumbai,india', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 10, 0, 0] }
              ],
              [
                { text: '64.14%', fontSize: 10, margin: [0, 0, 0, 0], colSpan:2 }
              ],
              [
                { text: 'SSC, Shree Ekveera Vidayalaya', fontSize: 10, margin: [0, 10, 0, 0] },
                { text: '06/2016-05/2017 | Mumbai,india', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 10, 0, 0] }
              ],
              [
                { text: '91.20%', fontSize: 10, margin: [0, 0, 0, 0], colSpan:2 }
              ],
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Skills', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [172, 172, 172],
            body: [
              [
                {
                  stack: [
                    { ul: ['Angular', 'Node.js', 'MySQL'], fontSize:10, margin:[0, 5, 0, 0] }
                  ]
                },
                {
                  stack: [
                    { ul: ['Angular', 'Node.js', 'MySQL'], fontSize:10, margin:[0, 5, 0, 0] }
                  ]
                },
                {
                  stack: [
                    { ul: ['Angular', 'Node.js', 'MySQL'], fontSize:10, margin:[0, 5, 0, 0] }
                  ]
                }
              ]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Professinal Experience', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [260, 260],
            body: [
              [
                { text: 'Software Developer, Edulab Educational Exchange Pvt Ltd', fontSize: 10, margin: [0, 5, 0, 0] },
                { text: '12/2022-Present | Mumbai,india', fontSize: 10, alignment: 'center' as Alignment, margin: [0, 5, 0, 0] }
              ],
              [
                { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', fontSize: 10, margin: [0, 0, 0, 0], colSpan:2 }
              ]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Certificate', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Full Stack Developer', fontSize: 10, alignment: 'left' as Alignment, margin: [0, 5, 0, 0] }],
              [{ text: 'Completed Full Stack developer course from NSDC', fontSize: 10, alignment: 'left' as Alignment, margin: [0, 0, 0, 0] }],
              [{ text: '(August 2022 - October 2022)', fontSize: 10, alignment: 'left' as Alignment, margin: [0, 0, 0, 0] }]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Languages', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [260, 260],
            body: [
              [
                { text: 'English', fontSize: 10, margin: [0, 5, 0, 0] },
                { text: 'Marathi', fontSize: 10, margin: [0, 5, 0, 0] }
              ],
              [
                { text: 'Hindi', fontSize: 10, margin: [0, 0, 0, 0], colSpan:2 }
              ]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Personal Strengths', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [260, 260],
            body: [
              [
                { text: 'Good relationship with colleagues with adptive attitude.', fontSize: 10, margin: [0, 5, 0, 0] },
                { text: 'Highly self-motivated,perservering and able to set effective priorities.', fontSize: 10, margin: [0, 5, 0, 0] }
              ],
              [
                { text: 'Good relationship with colleagues with adptive attitude.', fontSize: 10, margin: [0, 5, 0, 0] },
                { text: 'Highly self-motivated,perservering and able to set effective priorities.', fontSize: 10, margin: [0, 5, 0, 0] }
              ]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'Declaration', fontSize: 12, alignment: 'left' as Alignment, margin: [0, 10, 0, 0], bold: true }]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 1, x2: 530, y2: 1, lineWidth: 0.5 }]
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'I hereby declare that the above information provided by me is true and correct to the best on my knowledge and belief', fontSize: 10, alignment: 'left' as Alignment, margin: [0, 10, 0, 0] }]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [520],
            body: [
              [{ text: 'signUrl', fontSize: 10, alignment: 'right', margin:[0, 6, 0, 0] }],
              [{ text: 'Rutuja Patil', fontSize: 10, alignment: 'right' }]
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