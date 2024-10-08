import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import fileS from 'fs';
import fs from 'fs/promises';
import generatePDF from 'html-template-to-pdf';

// Jika menggunakan __dirname di ES Module, kita perlu mendefinisikannya secara manual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createPdf(inputFile, outputFile){
  // Set header template
  const headerTemplate = `
  <div style="font-size: 9px; padding: 5px; margin-bottom: 5px; border-bottom: 1px solid #ccc;">
      <span class="date"></span>
      <span style="flex: 1; text-align: center;" class="title"></span>
  </div>
  `;
  // // Set footer template
  // const footerTemplate = `
  //   <div style="font-size: 10px; padding: 5px 15px 0px 15px; border-top: 1px solid #ccc; text-align: center; center; position: absolute; right: 0;">
  //     <span class="pageNumber"></span> / <span class="totalPages"></span>
  //   </div>
  // `;

  // Generate PDF
  
  const options = { 
    format: 'A4', 
    headerTemplate: headerTemplate,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    displayHeaderFooter: true,
    margin: {
        top: '70px',
        bottom: '50px',
        left: '10px',
        right: '10px'
    },
  };

  //mengenerate file pdf dari template Html yang telah di buat
  const arrayBuffer = await generatePDF(inputFile, null, options);
  const fileStream = fileS.createWriteStream(outputFile);
  fileStream.write(Buffer.from(arrayBuffer));
  fileStream.end();
}

export async function pdfGenerate(data, name) {
  // Mengisi template dengan data yang diterima
  const filledTemplate = await ejs.renderFile(path.join(__dirname,'../../views/pdf', 'template-pdf.ejs'), { data });
  
  // Menentukan path untuk menyimpan file Html dan mengenerate Html (sementara)
  const tempHtmlPath   = path.join(__dirname,'../../views/pdf/temp', name + '.html');
  await fs.writeFile(tempHtmlPath, filledTemplate, 'utf-8');
  
  // Menentukan path untuk menyimpan file PDF
  const pdfPath = path.join(__dirname,'../../views/pdf/temp', name + '.pdf');

  await createPdf(tempHtmlPath, pdfPath);

  setTimeout(() => {
      try {
        //Hapus file template Html
        fileS.unlinkSync(tempHtmlPath)
        //hapus file pdf
        fileS.unlinkSync(pdfPath)
      } catch (error) {
        // console.log(error.message)
        // console.log("filenya udah kehapus duluan keanya")
      }
  }, 60000);

}