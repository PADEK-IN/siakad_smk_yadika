import Kelas from '../../../../models/kelas.model.js';
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getClassPage = async(req, res) => {
  try {
    const dataClass = await Kelas.findAll();
    const kelas = dataClass.map((kelas) => {
      return {
        ...kelas.dataValues,
        id: hashids.encode(kelas.id),
      };
    });
    res.render("pages/admin/class/index.ejs", {kelas});
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }};

export const addClassPage = (req, res) => {
    res.render("pages/admin/class/add.ejs");
  };

export const editClassPage = (req, res) => {
    res.render("pages/admin/class/edit.ejs");
  };
  