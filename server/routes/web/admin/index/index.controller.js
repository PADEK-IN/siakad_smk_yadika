import Jurusan from "../../../../models/jurusan.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const dashboardAdminPage = (req, res) => {
  res.render("pages/admin/index");
};
export const jurusanAdminPage = async(req, res) => {
  try {
    const dataJurusan = await Jurusan.findAll();

    const jurusan = dataJurusan.map((jurusan) => {
        return {
          ...jurusan.dataValues,
          id: hashids.encode(jurusan.id)
        };
      });

    res.render("pages/admin/jurusan/index", { jurusan });
  } catch (error) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
};
