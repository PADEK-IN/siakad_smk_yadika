import * as responses from "../../../helpers/response.js";
import { pdfGenerate } from "../../../helpers/pdf.js";

export const generatePdf = async (req, res) => {
    try {
      const { fileName, content } = req.body;
      await pdfGenerate(content, fileName);
      responses.res200("PDF generated successfully", null, res);
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
        "../../views/pdf/temp",
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