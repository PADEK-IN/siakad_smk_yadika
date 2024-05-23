import Kelas from '../../../../models/kelas.model.js';
import Guru from "../../../../models/guru.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getClassPage = async(req, res) => {
  try {
    const dataClass = await Kelas.findAll({
      include: [
        {
          model: Guru,
          attributes: [ "nama"],
        },
      ]
    });
    const kelas = dataClass.map((kelas) => {
      return {
        ...kelas.dataValues,
        id: hashids.encode(kelas.id),
        Guru: kelas.Guru.nama,
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
          ...guru.dataValues,
          // id: guru.id,
          id: hashids.encode(guru.id)
        };
      });
      for (const data of guru) {
        console.log({data});
      }
    res.render("pages/admin/class/add.ejs", {guru});
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
  };

export const editClassPage = async(req, res) => {
  try {
    const parts = req.url.split('/');
    let classId = parts[parts.length - 2];

    const decodedClassId = hashids.decode(classId);
    const dataClass = await Kelas.findOne({
      where: { id: decodedClassId },
      include: [
        {
          model: Guru,
          attributes: [ "nama", "id" ],
        },
      ],
    });
    const kelas = {
      ...dataClass.dataValues,
      id: hashids.encode(dataClass.id),
      GuruId: hashids.encode(dataClass.Guru.id),
    };

    const dataGuru = await Guru.findAll();

    const guru = dataGuru.map((guru) => {
        return {
          ...guru.dataValues,
          id: hashids.encode(guru.id)
        };
      });
    res.render("pages/admin/class/edit.ejs", { kelas, guru });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }};
  