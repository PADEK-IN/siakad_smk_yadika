import Kelas from '../../../../models/kelas.model.js';
import Guru from "../../../../models/guru.model.js";
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

export const addClassPage = async(req, res) => {
  try {
    const dataGuru = await Guru.findAll();

    const guru = dataGuru.map((guru) => {
        return {
          ...guru.dataValues
        };
      });
    res.render("pages/admin/class/add.ejs", {guru});
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
  };

export const editClassPage = async(req, res) => {
  try {
    const dataGuru = await Guru.findAll();

    const guru = dataGuru.map((guru) => {
        return {
          ...guru.dataValues,
          id: hashids.encode(guru.id)
        };
      });
    res.render("pages/admin/class/edit.ejs", {guru});
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }};
  