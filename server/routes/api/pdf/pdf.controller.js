import path from 'path';
import { fileURLToPath } from 'url';
import * as responses from "../../../helpers/response.js";
import { pdfGenerate } from "../../../helpers/pdf.js";

// Jika menggunakan __dirname di ES Module, kita perlu mendefinisikannya secara manual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePdf = async (req, res) => {
    try {
        const { fileName, content } = req.body;
        await pdfGenerate(content, fileName);
        res.redirect("/api/pdf/download/" + fileName);
    } catch (error) {
        console.log(error);
        responses.res500("Internal Server Error", res);
    }
};
  
export  const download = async (req, res) => {
    try {
      const { name } = req.params;
      const pdfPath = path.join(
        __dirname,
        "../../../../views/pdf/temp",
        name + ".pdf"
      );
      res.download(pdfPath);
    } catch (error) {
      console.log(error.message);
      responses.res500("Internal Server Error", res);
    }
};

export const template = async (req, res) => {
    try {
        res.render("pdf/template-pdf");
    } catch (error) {
        console.log(error.message);
        responses.res500("Internal Server Error", res);
    }
}